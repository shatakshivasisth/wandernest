package com.wandernest.backend.service;

import com.wandernest.backend.dto.wishlist.WishlistRequest;
import com.wandernest.backend.dto.wishlist.WishlistResponse;
import com.wandernest.backend.entity.Cabin;
import com.wandernest.backend.entity.User;
import com.wandernest.backend.entity.Wishlist;
import com.wandernest.backend.exception.WishlistException;
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

    public WishlistService(WishlistRepository wishlistRepository,
                           UserRepository userRepository,
                           CabinRepository cabinRepository) {

        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.cabinRepository = cabinRepository;
    }

    public WishlistResponse addToWishlist(WishlistRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new WishlistException("User not found."));

        Cabin cabin = cabinRepository.findById(request.getCabinId())
                .orElseThrow(() ->
                        new WishlistException("Cabin not found."));

        if (wishlistRepository.findByUserIdAndCabinId(
                request.getUserId(),
                request.getCabinId()).isPresent()) {

            throw new WishlistException(
                    "Cabin already exists in wishlist.");
        }

        Wishlist wishlist = new Wishlist();

        wishlist.setUser(user);
        wishlist.setCabin(cabin);

        Wishlist saved = wishlistRepository.save(wishlist);

        WishlistResponse response = new WishlistResponse();

        response.setWishlistId(saved.getId());
        response.setCabinId(cabin.getId());
        response.setCabinTitle(cabin.getTitle());
        response.setLocation(cabin.getLocation());

        if (!cabin.getImages().isEmpty()) {
            response.setImageUrl(
                    cabin.getImages().get(0).getImageUrl()
            );
        }

        return response;
    }
    public List<WishlistResponse> getWishlist(Long userId) {

        List<Wishlist> wishlist = wishlistRepository.findByUserId(userId);

        return wishlist.stream().map(item -> {

            WishlistResponse response = new WishlistResponse();

            response.setWishlistId(item.getId());
            response.setCabinId(item.getCabin().getId());
            response.setCabinTitle(item.getCabin().getTitle());
            response.setLocation(item.getCabin().getLocation());

            if (!item.getCabin().getImages().isEmpty()) {
                response.setImageUrl(
                        item.getCabin().getImages().get(0).getImageUrl()
                );
            }

            return response;

        }).toList();
    }
    public void removeFromWishlist(Long wishlistId) {

        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() ->
                        new WishlistException("Wishlist item not found."));

        wishlistRepository.delete(wishlist);
    }
}