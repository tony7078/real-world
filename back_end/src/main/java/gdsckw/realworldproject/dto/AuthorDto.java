package gdsckw.realworldproject.dto;

import gdsckw.realworldproject.entity.User;

public class AuthorDto {
    private String username;
    private String bio;
    private String image;
    private boolean following;

    public AuthorDto(User user) {
        this.username = user.getUsername();
        this.bio = user.getBio();
        this.image = user.getImage();
        // 추후
        this.following = false; // 예시로 false 값을 사용
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isFollowing() {
        return following;
    }

    public void setFollowing(boolean following) {
        this.following = following;
    }
}
