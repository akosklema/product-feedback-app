import classes from './ProfileImg.module.css';

function ProfileImg({ className, src, alt }) {
  return (
    <img src={src} alt={alt} className={`${classes['profile-img']} ${className}`} />
  );
};

export default ProfileImg;