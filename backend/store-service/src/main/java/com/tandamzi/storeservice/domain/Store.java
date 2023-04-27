package com.tandamzi.storeservice.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalTime;

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
//    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
//    private List<StoreAllergy> allergyList;
    private Long ownerId;
    private String name;
//    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
//    private List<StoreImage> images = new ArrayList<>();
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
}


