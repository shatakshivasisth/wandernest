package com.wandernest.backend.controller.wishlist;

import com.wandernest.backend.dto.wishlist.WishlistRequest;
import com.wandernest.backend.dto.wishlist.WishlistResponse;
import com.wandernest.backend.service.WishlistService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping
    public WishlistResponse add(
            @Valid @RequestBody WishlistRequest request
    ) {
        return wishlistService.add(request);
    }

    @GetMapping("/{userId}")
    public List<WishlistResponse> getWishlist(
            @PathVariable Long userId
    ) {
        return wishlistService.getUserWishlist(userId);
    }

    @DeleteMapping("/{userId}/{cabinId}")
    public void remove(
            @PathVariable Long userId,
            @PathVariable Long cabinId
    ) {
        wishlistService.remove(userId, cabinId);
    }

}