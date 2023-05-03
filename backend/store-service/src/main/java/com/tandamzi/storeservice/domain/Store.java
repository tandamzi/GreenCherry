package com.tandamzi.storeservice.domain;

import com.tandamzi.storeservice.dto.request.UpdateStoreRequestDto;
import lombok.*;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"type", "cherryBox"})
public class Store extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id")
    private Type type;
    private Long ownerId;
    private String name;
    private String description;
    private String snsAccount;
    @Embedded
    private Address address;
    private String phone;
    private LocalTime pickUpStartTime;
    private LocalTime pickUpEndTime;
    private int cherryPoint;
    private boolean open;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cherry_box_id")
    private CherryBox cherryBox;

    public void updateStore(String storeDescription, LocalTime pickUpStartTime,LocalTime pickUpEndTime, String snsAccount) {
        if (storeDescription!=null) {
            this.description = storeDescription;
        }
        if (pickUpStartTime!=null) {
            this.pickUpStartTime = pickUpStartTime;
        }
        if (pickUpEndTime!=null) {
            this.pickUpEndTime = pickUpEndTime;
        }
        if (snsAccount!=null) {
            this.snsAccount = snsAccount;
        }
    }

    public void increaseCherryPoint(int point){
        this.cherryPoint += point;
    }
}


