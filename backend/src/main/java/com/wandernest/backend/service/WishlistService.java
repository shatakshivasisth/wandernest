package com.wandernest.backend.service;

import com.wandernest.backend.dto.wishlist.WishlistRequest;
import com.wandernest.backend.dto.wishlist.WishlistResponse;
import com.wandernest.backend.entity.Cabin;
import com.wandernest.backend.entity.User;
import com.wandernest.backend.entity.Wishlist;
import com.wandernest.backend.repository.CabinRepository;
import com.wandernest.backend.repository.UserRepository;
import com.wandernest.backend.repository.WishlistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final CabinRepository cabinRepository;

    public WishlistService(
            WishlistRepository wishlistRepository,
            UserRepository userRepository,
            CabinRepository cabinRepository
    ) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.cabinRepository = cabinRepository;
    }

    public WishlistResponse add(WishlistRequest request) {

        if (wishlistRepository.findByUserIdAndCabinId(
                request.getUserId(),
                request.getCabinId()
        ).isPresent()) {

            throw new RuntimeException("Already in wishlist.");

        }

        User user = userRepository.findById(request.getUserId()).orElseThrow();

        Cabin cabin = cabinRepository.findById(request.getCabinId()).orElseThrow();

        Wishlist wishlist = new Wishlist();

        wishlist.setUser(user);
        wishlist.setCabin(cabin);

        Wishlist saved = wishlistRepository.save(wishlist);

        return map(saved);

    }

    public List<WishlistResponse> getUserWishlist(Long userId) {

        return wishlistRepository.findByUserId(userId)
                .stream()
                .map(this::map)
                .toList();

    }

    public void remove(Long userId, Long cabinId) {

        wishlistRepository.deleteByUserIdAndCabinId(
                userId,
                cabinId
        );

    }

    private WishlistResponse map(Wishlist wishlist) {

        WishlistResponse response = new WishlistResponse();

        response.setWishlistId(wishlist.getId());

        response.setCabinId(wishlist.getCabin().getId());

        response.setCabinTitle(wishlist.getCabin().getTitle());

        response.setLocation(wishlist.getCabin().getLocation());

        response.setRating(wishlist.getCabin().getRating());

        response.setPrice(
                wishlist.getCabin().getPricePerNight().toString()
        );

        if (!wishlist.getCabin().getImages().isEmpty()) {

            response.setImageUrl(
                    wishlist.getCabin()
                            .getImages()
                            .getFirst()
                            .getImageUrl()
            );

        }

        return response;

    }

}