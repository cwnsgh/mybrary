
package com.mybrary.backend.domain.mybrary.repository.custom;
import com.mybrary.backend.domain.member.entity.Member;
import com.mybrary.backend.domain.mybrary.dto.MybraryGetDto;
import com.mybrary.backend.domain.mybrary.dto.MybraryOtherGetDto;
import com.mybrary.backend.domain.mybrary.entity.Mybrary;
import java.util.Optional;
public interface MybraryRepositoryCustom {
    Mybrary findByMybraryId(Long mybraryId);
    MybraryGetDto getMybrary(Long myId);
    MybraryOtherGetDto getOtherMybrary(Long otherId);
}