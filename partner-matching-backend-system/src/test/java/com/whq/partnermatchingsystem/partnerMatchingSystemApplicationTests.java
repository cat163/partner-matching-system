package com.whq.partnermatchingsystem;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.DigestUtils;

@SpringBootTest
class partnerMatchingSystemApplicationTests {

    @Test
    void testDigest(){
        String digest = DigestUtils.md5DigestAsHex(("asasasa" + "myPassword").getBytes());
        System.out.println(digest);
    }

    @Test
    void contextLoads() {
    }

}
