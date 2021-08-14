import React from 'react';

interface NavBarProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  tabsList: string[];
  tab: string;
}

function NavBar({ setTab, tabsList, tab }: NavBarProps): JSX.Element {
  const tabButtons = tabsList.reduce<React.ReactNode[]>((acc, name) => {
    acc.push(
      <button
        className="navBarButtons"
        key={name}
        style={
          tab === name
            ? {
                color: '#1cb5c9',
                backgroundColor: '#212121',
                fontWeight: 'bold',
              }
            : { color: '#e6e6e6', fontWeight: 'bold' }
        }
        onClick={() => {
          setTab(name);
        }}
      >
        {name}
      </button>
    );
    return acc;
  }, []);
  // Renders the array of NavBar buttons generated above
  return <div className="navBar">{tabButtons}</div>;
}

export default NavBar;