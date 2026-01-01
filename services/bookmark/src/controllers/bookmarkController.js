import Bookmark from "../models/bookmarkModel";

export const addBookmark = async(req, res) => {
  const userId = req.user.id;
  const tweetId = req.params.id
  const bookmark = await Bookmark.create({
    userId,
    tweetId
  })
  res.status(201).json({
    status: "success",
    data: {
        bookmark
    }
  })

}

