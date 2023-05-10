package com.tandamzi.storeservice.repository;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tandamzi.storeservice.domain.QStore;
import com.tandamzi.storeservice.domain.Store;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.tandamzi.storeservice.domain.QStore.store;
import static com.tandamzi.storeservice.domain.QSubscribe.subscribe;

@Slf4j
@AllArgsConstructor
public class StoreRepositoryImpl implements StoreRepositoryCustom {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    @Override
    //memberId와 storeId로 동적쿼리 가게 조회. Store엔티티 안의 Type와 cherryBox를 fetch join해서 모두 가져옴
    public Optional<Store> findStoreByIdAndMember(Long memberId, Long storeId) {
        Store store = queryFactory.selectFrom(QStore.store)
                .leftJoin(QStore.store.type).fetchJoin()
                .leftJoin(QStore.store.cherryBox).fetchJoin()
                .where(storeIdEq(storeId), memberIdEq(memberId))
                .fetchOne();
        return Optional.ofNullable(store);
    }

    private BooleanExpression memberIdEq(Long memberId) {
        return memberId != null ? store.memberId.eq(memberId) : null;
    }

    private BooleanExpression storeIdEq(Long storeId) {
        return storeId != null ? store.id.eq(storeId) : null;
    }

    @Override
    public Page<Store> findNearbyPlacesWithSubscription(long memberId, double radius, double latitude, double longitude, boolean sub, Pageable pageable) {
        List<Store> stores = queryFactory.selectDistinct(store)
                .from(store)
                .leftJoin(subscribe)
                .on(store.eq(subscribe.store))
                .where(subContain(memberId, sub))
                .fetch();

        List<Store> radiusFilteredList = stores.stream().filter(store -> {
            double distance = calculateDistance(latitude, longitude, store.getAddress().getLat(), store.getAddress().getLng());
            return distance <= radius;
        }).collect(Collectors.toList());


        return new PageImpl<>(radiusFilteredList, pageable, radiusFilteredList.size());
    }

    private BooleanExpression subContain(Long memberId, boolean sub) {
        return sub ? subscribe.memberId.eq(memberId) : null;
    }

    private double calculateDistance(double userLat, double userLng, double storeLat, double storeLng) {
        // 위도와 경도를 라디안 단위로 변환
        double userLatRadian = Math.toRadians(userLat);
        double userLngRadian = Math.toRadians(userLng);
        double storeLatRadian = Math.toRadians(storeLat);
        double storeLngRadian = Math.toRadians(storeLng);

        // 두 점 사이의 위도 및 경도 차이
        double latDifference = storeLatRadian - userLatRadian;
        double lngDifference = storeLngRadian - userLngRadian;

        // Haversine 공식 적용
        double a = Math.pow(Math.sin(latDifference / 2), 2)
                + Math.cos(userLatRadian) * Math.cos(storeLatRadian)
                * Math.pow(Math.sin(lngDifference / 2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // 지구 반지름 (킬로미터 단위)
        double earthRadius = 6371;

        // 두 점 사이의 거리 반환 (킬로미터 단위)
        return earthRadius * c;
    }
}
