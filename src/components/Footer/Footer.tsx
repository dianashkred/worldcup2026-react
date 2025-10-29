import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoIcon from '../../assets/icons/logo_fifa.png';
import instagramIcon from '../../assets/icons/social-instagram.svg';
import twitterIcon from '../../assets/icons/social-twitter.svg';
import youtubeIcon from '../../assets/icons/social-youtube.svg';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 6rem;
  background-color: #000;
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
  align-items: flex-start;
  gap: 15rem;
`;

const FooterLogoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FooterLogo = styled.img`
  height: 50px;
  margin-bottom: 1rem;
`;


const FooterLinksSection = styled.div`
  display: flex;
  gap: 5rem;
  flex: 2;
  justify-content: space-between;
`;

const FooterLinksGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHeading = styled.p`
  color: #fff;
  font-size: 13px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  line-height: 20px;
  letter-spacing: 1.5px;
  font-weight: 400;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  line-height: 20px;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 28px;
  transition: all 0.2s ease-in;

  &:hover {
    color: #4b57dbff;
  }
`;


const FooterBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
  color: #fff;
  font-size: 0.9rem;
`;



const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIconLink = styled.a`
  width: 40px;
  height: 40px;
  opacity: 0.8;
  border: 1px solid rgba(126, 130, 143, 0.3);
  border-radius: 50%;
  background-color: #fff;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #d1eef2;
    transform: scale(1.1);
    opacity: 1;
  }
`;

const SocialIcon = styled.img`
  width: 14px;
  height: 14px;
  opacity: 0.8;
`;

const Footer: FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogoSection>
          <FooterLogo src={logoIcon} alt="Logo_fifa" />
        </FooterLogoSection>
        <FooterLinksSection>
          <FooterLinksGroup>
            <FooterHeading>Company</FooterHeading>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/order">Order</FooterLink>
            <FooterLink to="#">FAQ</FooterLink>
            <FooterLink to="#">Contact</FooterLink>
          </FooterLinksGroup>

          <FooterLinksGroup>
            <FooterHeading>Social</FooterHeading>
            <FooterLink to="https://www.google.com" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </FooterLink>
            <FooterLink to="https://www.google.com" target="_blank" rel="noopener noreferrer">
              Terms Of Service
            </FooterLink>
            <FooterLink to="https://www.google.com" target="_blank" rel="noopener noreferrer">
              Manage Cookie Preferences
            </FooterLink>
          </FooterLinksGroup>
        </FooterLinksSection>
      </FooterContent>
      <FooterBottom>
        <SocialIcons>
          <SocialIconLink href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon src={instagramIcon} alt="Instagram" />
          </SocialIconLink>
          <SocialIconLink href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon src={twitterIcon} alt="Twitter" />
          </SocialIconLink>
          <SocialIconLink href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon src={youtubeIcon} alt="YouTube" />
          </SocialIconLink>
        </SocialIcons>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;