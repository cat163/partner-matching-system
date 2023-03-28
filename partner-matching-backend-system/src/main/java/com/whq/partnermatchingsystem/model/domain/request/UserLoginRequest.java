package com.whq.partnermatchingsystem.model.domain.request;

import lombok.Data;

/**
 * @author: whq
 * @description:
 * @time: 2022/12/18 16:25
 */
@Data
public class UserLoginRequest {

    private String userAccount;

    private String userPassword;


}
