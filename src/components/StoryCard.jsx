
import { Link } from "react-router-dom";

function StoryCard({ story }) {
  if (!story) {
    return null;
  }

  return (
    <Link
      to={`/stories/${story.slug}`}
      className="story-card"
      aria-label={`Read story: ${story.title}`}
    >
      <div className="story-content">
        {story.category && (
          <p className="story-category">
            {story.category}
          </p>
        )}

        <h3>{story.title}</h3>

        {story.excerpt && (
          <p>{story.excerpt}</p>
        )}

        <span className="text-link">
          Read Story
          <span aria-hidden="true"> →</span>
        </span>
      </div>
    </Link>
  );
}

export default StoryCard;
