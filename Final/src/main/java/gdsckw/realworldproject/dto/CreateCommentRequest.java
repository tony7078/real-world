package gdsckw.realworldproject.dto;

public class CreateCommentRequest {
    private CommentDto comment;

    public static class CommentDto {
        private String body;

        public String getBody() {
            return body;
        }

        public void setBody(String body) {
            this.body = body;
        }
    }

    public CommentDto getComment() {
        return comment;
    }

    public void setComment(CommentDto comment) {
        this.comment = comment;
    }
}
