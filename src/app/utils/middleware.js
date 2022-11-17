import Profile from "../modules/profile/model.js";

export const getProfile = async (req, res, next) => {
  const id = req.get("profile_id") || 0;
  let profile = await Profile.findOne({
    where: { id },
  });
  if (!profile) return res.status(404).end();
  if (req.params) {
    if (profile.id !== req.params.id)
      return res.status(401).json({ error: "Unauthorized!" });
  }
  req.profile = profile;
  next();
};

export const guard = async (req, res, next) => {
  const id = req.get("profile_id") || 0;
  let profile = await Profile.findOne({
    where: { id },
  });
  if (!profile) return res.status(401).json({ error: "Unauthorized!" });
  req.profile = profile;
  next();
};
