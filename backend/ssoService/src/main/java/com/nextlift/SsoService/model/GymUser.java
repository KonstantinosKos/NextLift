package com.nextlift.SsoService.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Getter
// @Setter
// @AllArgsConstructor
// @NoArgsConstructor
// public class GymUser {

//     private int age;
//     private String name;
// }

@Entity  // αυτή η κλάση εκπροσωπεί ένα table στο database του Χρηστάρα
@NoArgsConstructor  // Δημιουργία κενού constructor
@AllArgsConstructor  // Δημιουργία constructor με όλα τα πεδία
public class GymUser {
    @Id  // Ορισμός του primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Αυτόματη δημιουργία μοναδικού ID
    private Long id;  // Μοναδικό αναγνωριστικό χρήστη

    private String username;  // Όνομα χρήστη
    private String password;  // Κωδικός πρόσβασης

}   