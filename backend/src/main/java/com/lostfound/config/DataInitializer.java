package com.lostfound.config;

import com.lostfound.entity.Item;
import com.lostfound.entity.User;
import com.lostfound.repository.ItemRepository;
import com.lostfound.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           ItemRepository itemRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Seed Admin Jegan Account
        if (userRepository.findByEmail("jegan@gmail.com").isEmpty()) {
            User adminJegan = new User();
            adminJegan.setName("Admin Jegan");
            adminJegan.setEmail("jegan@gmail.com");
            adminJegan.setPassword(passwordEncoder.encode("jegan123"));
            adminJegan.setPhone("9999999999");
            adminJegan.setRole("ADMIN");
            userRepository.save(adminJegan);
            System.out.println(">>> Admin user created: jegan@gmail.com / jegan123");
        }

        // Seed Admin Nandha Account
        if (userRepository.findByEmail("nandha@gmail.com").isEmpty()) {
            User adminNandha = new User();
            adminNandha.setName("Admin Nandha");
            adminNandha.setEmail("nandha@gmail.com");
            adminNandha.setPassword(passwordEncoder.encode("Nandha@2007"));
            adminNandha.setPhone("9888888888");
            adminNandha.setRole("ADMIN");
            userRepository.save(adminNandha);
            System.out.println(">>> Admin user created: nandha@gmail.com / Nandha@2007");
        }

        // Seed Demo Student Account
        User studentUser = userRepository.findByEmail("student@college.edu").orElse(null);
        if (studentUser == null) {
            User student = new User();
            student.setName("Ravi Kumar");
            student.setEmail("student@college.edu");
            student.setPassword(passwordEncoder.encode("student123"));
            student.setPhone("9876543210");
            student.setRole("USER");
            studentUser = userRepository.save(student);
            System.out.println(">>> Demo Student user created: student@college.edu / student123");
        }

        // Seed Sample Items if database is empty
        if (itemRepository.count() == 0) {
            // Lost Item 1
            Item item1 = new Item();
            item1.setItemId("LF-0001");
            item1.setType("LOST");
            item1.setName("Dark Blue Nike Backpack");
            item1.setDescription("Dark blue Nike laptop backpack containing a 14-inch Dell laptop, notebooks, and a blue water bottle.");
            item1.setCategory("Bags");
            item1.setLocation("Central Library");
            item1.setReportedDate(LocalDate.now().minusDays(2));
            item1.setReporterName("Ravi Kumar");
            item1.setReporterContact("9876543210");
            item1.setStatus("ACTIVE");
            item1.setUserId(studentUser.getUserId());
            item1.setExtraField1("Reading Hall Row 3");
            item1.setExtraField2("$20 Reward / Treats");
            item1.setImageUrl("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80");
            itemRepository.save(item1);

            // Found Item 1 (Matching candidate for item1)
            Item item2 = new Item();
            item2.setItemId("LF-0002");
            item2.setType("FOUND");
            item2.setName("Blue Nike Laptop Bag");
            item2.setDescription("Navy blue Nike backpack found on the 2nd floor study section near row 4. Has notebooks inside.");
            item2.setCategory("Bags");
            item2.setLocation("Central Library");
            item2.setReportedDate(LocalDate.now().minusDays(1));
            item2.setReporterName("Priya S");
            item2.setReporterContact("8765432109");
            item2.setStatus("ACTIVE");
            item2.setUserId(studentUser.getUserId());
            item2.setExtraField1("2nd Floor Study Desk");
            item2.setExtraField2("Admin Office Desk 2");
            item2.setImageUrl("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80");
            itemRepository.save(item2);

            // Found Item 2
            Item item3 = new Item();
            item3.setItemId("LF-0003");
            item3.setType("FOUND");
            item3.setName("Black Leather Wallet");
            item3.setDescription("Black synthetic leather wallet containing student ID card and cash counter receipt.");
            item3.setCategory("Accessories");
            item3.setLocation("Student Canteen");
            item3.setReportedDate(LocalDate.now().minusDays(3));
            item3.setReporterName("Security Desk");
            item3.setReporterContact("9998887776");
            item3.setStatus("ACTIVE");
            item3.setUserId(studentUser.getUserId());
            item3.setExtraField1("Near Cash Counter");
            item3.setExtraField2("Security Main Gate");
            item3.setImageUrl("https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80");
            itemRepository.save(item3);

            // Lost Item 2
            Item item4 = new Item();
            item4.setItemId("LF-0004");
            item4.setType("LOST");
            item4.setName("Silver Sony Noise-Canceling Headphones");
            item4.setDescription("Over-ear silver Sony WH-1000XM4 headphones in a black carrying case.");
            item4.setCategory("Electronics");
            item4.setLocation("Auditorium Complex");
            item4.setReportedDate(LocalDate.now().minusDays(4));
            item4.setReporterName("Anand R");
            item4.setReporterContact("9123456789");
            item4.setStatus("ACTIVE");
            item4.setUserId(studentUser.getUserId());
            item4.setExtraField1("Block B Row 12");
            item4.setExtraField2("None");
            item4.setImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80");
            itemRepository.save(item4);

            System.out.println(">>> Sample Lost & Found demo data seeded successfully.");
        }
    }
}
