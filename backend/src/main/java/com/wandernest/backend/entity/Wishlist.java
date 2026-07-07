package com.wandernest.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "wishlist")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cabin_id", nullable = false)
    private Cabin cabin;

    public Wishlist() {
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Cabin getCabin() {
        return cabin;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCabin(Cabin cabin) {
        this.cabin = cabin;
    }
}