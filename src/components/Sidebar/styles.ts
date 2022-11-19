import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { btnReset, v } from '../../styles/variables';



export const SSidebar = styled.div`
    width: v.sidebarWidth;
    background: ${({ theme }) => theme.bg};
    min-height: 100vh;
    padding: ${v.lgSpacing};
    z-index: 22;
    position: relative;
    transition: all 0.5s;
`;



export const SSidebarButton = styled.button`
    ${btnReset};
    position: absolute;
    top: ${v.xxlSpacing};
    margin-top: 45px;
    right: -9px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.bg};
    box-shadow: 0 0 4px ${({ theme }) => theme.bg3}, 0 0 7px ${({ theme }) => theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: initial;
    color: ${({ theme }) => theme.primary};
    transition: all 0.5s;
`;

export const SLogo = styled.div`
    width: 60px;
    height: 60px;
    img {
        max-width: 100%;
        height: auto;
    }
    display: flex;
    cursor: pointer;
    transition: all 0.5s;
`;

export const STitleLogo = styled.div`
    width: 150px;
    height: 40px;
    img {
        max-width: 100%;
        height: auto;
    }
    margin-bottom: 30px;
    margin-right: -20px;
    transition: all 0.5s;
    display: inline-block;
`;
export const SDivider = styled.div`
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.bg3};
    margin: ${v.lgSpacing} 0;
`;

export const SLinkContainer = styled.div`
    border-radius: ${v.borderRadius};
    margin: 8px 0;
    color: ${({ theme }) => theme.text};
    right: -9px;
    :hover {
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.bg3};
        background: ${({ theme }) => theme.bg3};
    }
`;

export const SLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    :hover {
        color: ${({ theme }) => theme.text};
    }
    color: inherit;
    font-size: 16px;
    padding: calc(${v.smSpacing} - 2px) 0;
`;

export const SLinkIcon = styled.div`
    padding: ${v.smSpacing} ${v.mdSpacing};
    display: flex;
    color: ${({ theme }) => theme.primary};
    svg {
        font-size: 20px;
    }
    transition: all 0.5s;
`;

export const ModeIcon = styled.div`
    padding: ${v.smSpacing} ${v.mdSpacing};
    display: inline-block;
    color: ${({ theme }) => theme.test};
    svg {
        font-size: 23px;
    }
`;

export const SLinkLabel = styled.span`
    display: block;
    flex: 1;
    margin-left: ${v.smSpacing};
    margin-right: 40px;
`;


export const STheme = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    transition: all 0.5s;
`;
export const SThemeLabel = styled.span`
    display: block;
    flex: 1;
    color: ${({ theme }) => theme.text};
    transition: all 0.5s;
`;
export const SThemeToggler = styled.button`
    ${btnReset};
    margin: 0 auto;
    cursor: pointer;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    background: ${({ theme }) => theme.bgAlpha};
    transition: all 0.5s;
    position: relative;
`;

export const SToggleThumb = styled.div`
    height: 18px;
    width: 18px;
    position: absolute;
    top: 1px;
    bottom: 1px;
    transition: 0.2s ease right;
    right: calc(100% - 18px - 1px);
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    transition: all 0.5s;
`;
