import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, updateShowInstructions } from '../../redux/wordleReducer';
import './Header.scss';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Tooltip } from '@mui/material';

export const Header: React.FC = () => {
  const theme = useSelector((state: any) => state.wordle).theme
  const dispatch = useDispatch();

  return (
    <header className="Header">
      <div className="Header__wrapper">
        <button
          type="button"
          className="Header__help"
          onClick={() => dispatch(updateShowInstructions(true))}
        >
          <HelpOutlineOutlinedIcon
            style={{ color: theme === 'dark' ? "#fff" : "#000"}}
          />
        </button>

        <h1 className={`Header__title Header__title--${theme}`}>Wordle</h1>

        <button
          className="Header__theme"
          onClick={() => dispatch(changeTheme())}
        >
          {theme === 'dark'
            ? (
              <Tooltip title="Toggle Light">
                <LightModeIcon style={{ color: "yellow"}} />
              </Tooltip>
            )
            : (
              <Tooltip title="Toggle Dark">
                <DarkModeIcon style={{ color: "blue"}} />
              </Tooltip>
            )
          }
        </button>
      </div>
    </header>
  )
}
