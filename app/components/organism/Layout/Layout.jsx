import React, { useState } from 'react';
import { LeftNav, TopNav } from '../../molecules';

export default function Layout({ children, isLogin, userName, isAdmin }) {
  // const [isLogin, setIsLogin] = useState(true);
  const loggedIn = isLogin ? isLogin : false;
  const userImg =
    'https://static-getcaribou.s3.ca-central-1.amazonaws.com/images/Admin+Panel/user.png';
  const [isProfileImg, setIsProfileImg] = useState(false);
  const profileImg = isProfileImg ? isProfileImg : userImg;
  return (
    <>
      <TopNav isLogin={loggedIn} userName={userName} userImg={profileImg} />
      <LeftNav isLogin={loggedIn} isAdmin={isAdmin}>
        {children}
      </LeftNav>
    </>
  );
}
