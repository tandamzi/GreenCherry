package tandamzi.pay.payservice.domain;


import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long id;

    private Long memberId;

    private String tid;

    private String itemName;

    private int quantity;

    private int totalAmount;

    private String partnerOrderId;

    @Enumerated(EnumType.STRING)
    private Status status;

    public void saveTid(String tid) {
        this.tid = tid;
    }
    public void changeStatus(Status status) {
        this.status = status;
    }
}
