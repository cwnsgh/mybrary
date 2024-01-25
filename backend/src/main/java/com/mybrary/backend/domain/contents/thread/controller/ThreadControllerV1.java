package com.mybrary.backend.domain.contents.thread.controller;


import com.mybrary.backend.domain.contents.thread.dto.HomeThreadGetDto;
import com.mybrary.backend.domain.contents.thread.dto.ThreadGetDto;
import com.mybrary.backend.domain.contents.thread.dto.ThreadPostDto;
import com.mybrary.backend.domain.contents.thread.dto.ThreadUpdateDto;
import com.mybrary.backend.domain.contents.thread.service.ThreadService;
import com.mybrary.backend.domain.contents.thread.service.impl.ThreadServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Thread 컨트롤러", description = "Thread Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/thread")
public class ThreadControllerV1 {

    private final ThreadService threadService;

    @Operation(summary = "쓰레드 단건 조회", description = "쓰레드 아이디를 통한 쓰레드 조회")
    @GetMapping("/{id}")
    public ResponseEntity<?> getThread(
        @PathVariable(name = "id") Long threadId) {

        return new ResponseEntity<HomeThreadGetDto>(HttpStatus.OK);
    }

    @Operation(summary = "쓰레드 생성", description = "쓰레드 생성")
    @PostMapping
    public ResponseEntity<?> createThread(@RequestBody ThreadPostDto threads) {

        return new ResponseEntity<Long>(HttpStatus.OK);
    }

    @Operation(summary = "쓰레드 수정", description = "쓰레드 수정")
    @PutMapping
    public ResponseEntity<?> updateThread(@RequestBody ThreadUpdateDto threads) {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "쓰레드 삭제", description = "쓰레드 아이디를 통한 쓰레드 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteThread(@PathVariable(name = "id") Long threadId) {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "메인홈 쓰레드 조회", description = "메인홈에서의 쓰레드 목록 조회")
    @GetMapping("/home")
    public ResponseEntity<?> getMainThreadList(
        @PageableDefault(page = 0, size = 10) Pageable page) {

        return new ResponseEntity<List<HomeThreadGetDto>>(HttpStatus.OK);
    }

    @Operation(summary = "나의 쓰레드 조회", description = "나의 마이브러리 책상에서의 쓰레드 목록 조회")
    @GetMapping("/desk")
    public ResponseEntity<?> getMyThreadList(@PageableDefault(page = 0, size = 10) Pageable page) {

        return new ResponseEntity<List<ThreadGetDto>>(HttpStatus.OK);
    }

    @Operation(summary = "특정 회원의 쓰레드 조회", description = "회원 아이디를 통한 특정 회원의 마이브러리 책상에서의 쓰레드 목록 조회")
    @GetMapping("/{id}/desk")
    public ResponseEntity<?> getOtherThreadList(@PathVariable(name = "id") Long mybraryId,
                                                @PageableDefault(page = 0, size = 10) Pageable page) {

        return new ResponseEntity<List<HomeThreadGetDto>>(HttpStatus.OK);
    }


}
