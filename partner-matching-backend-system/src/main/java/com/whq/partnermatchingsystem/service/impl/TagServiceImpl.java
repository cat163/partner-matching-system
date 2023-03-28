package com.whq.partnermatchingsystem.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.whq.partnermatchingsystem.mapper.TagMapper;
import com.whq.partnermatchingsystem.model.domain.Tag;
import com.whq.partnermatchingsystem.service.TagService;
import org.springframework.stereotype.Service;

/**
* @author 35029
* @description 针对表【tag(标签)】的数据库操作Service实现
* @createDate 2023-01-01 14:44:39
*/
@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag>
    implements TagService {

}




