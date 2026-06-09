const forumLatest =
  "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Backend Development", className: "backend" },
};
const postsContainer = document.getElementById("posts-container");

const timeAgo = timeStamp => {
  const currentTime = Date.now();
  const lastTime = new Date(timeStamp).getTime();
  const passedTime = parseInt((currentTime - lastTime) / 1000);
  const minutes = parseInt(passedTime / 60);
  const hours = parseInt(minutes / 60);
  const days = parseInt(hours / 24);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const viewCount = views =>
  views >= 1000 ? `${Math.floor(views / 1000)}k` : views;

const forumCategory = id => {
  if (allCategories.hasOwnProperty(id)) {
    return `<a class='category ${allCategories[id].className}' href='${forumCategoryUrl}${allCategories[id].className}/${id}'>${allCategories[id].category}</a>`;
  } else {
    return `<a class='category general' href='${forumCategoryUrl}general/${id}'>General</a>`;
  }
};

const avatars = (posters, users) => {
  return posters
    .map(poster => {
      const user = users.find(user => user.id === poster.user_id);

      if (!user) return "";
      const avatarImgSize = user.avatar_template.replace("{size}", 30);
      const avatarPath = avatarImgSize.startsWith("/")
        ? avatarUrl + avatarImgSize
        : avatarImgSize;
      // console.log('AVATAR PATH', avatarPath)
      return `<img alt="${user.name}" src="${avatarPath}">`;
    })
    .join("");
};

const showLatestPosts = post => {
  const { users, topic_list } = post;
  const { topics } = topic_list;

  // console.log(
  //   'id:',topics[0].id,
  //   '\ntitle: ', topics[0].title,
  //   '\nviews: ', topics[0].views,
  //   '\nposts count: ', topics[0].posts_count,
  //   '\nslug: ', topics[0].slug,
  //   '\n POSTERS: ', topics[0].posters.map(poster => poster.user_id),
  //   '\ncategory id: ', topics[0].category_id,
  //   '\nbumped at: ', topics[0].bumped_at
  //   )

  topics.forEach(
    topic =>
      (postsContainer.innerHTML += `<tr>
    <td>
      <a class='post-title' href='${forumTopicUrl}${topic.slug}/${topic.id}'>${
        topic.title
      }</a>
      ${forumCategory(topic.category_id)}
    </td>
    <td>
      <div class='avatar-container'>${avatars(topic.posters, users)}</div>
    </td>
    <td>
      ${topic.posts_count - 1}
    </td>
    <td>
      ${viewCount(topic.views)}
    </td>
    <td>
      ${timeAgo(topic.bumped_at)}
    </td>
   </tr>`)
  );
};

const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
    // console.log(JSON.stringify(data, null, 2));
    showLatestPosts(data);
  } catch (error) {
    console.log(error);
  }
};

fetchData();
