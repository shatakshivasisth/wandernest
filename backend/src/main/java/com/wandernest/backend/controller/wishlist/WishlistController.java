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
    public WishlistResponse addToWishlist(
            @Valid @RequestBody WishlistRequest request) {

        return wishlistService.addToWishlist(request);
    }
    @GetMapping("/user/{userId}")
    public List<WishlistResponse> getWishlist(
            @PathVariable Long userId) {

        return wishlistService.getWishlist(userId);
    }
    @DeleteMapping("/{wishlistId}")
    public String removeFromWishlist(
            @PathVariable Long wishlistId) {

        wishlistService.removeFromWishlist(wishlistId);

        return "Cabin removed from wishlist successfully.";
    }
}