import { FC, useEffect, useState } from 'react';
import { Navigation, Wrapper } from './App.styles';
import { Grid, NavigationMenu } from '@pearsonwfs/component-library';
import { OccupationTransitionRoi } from '../apps/OccupationTransitionRoi/OccupationTransitionRoi';

const App: FC = () => {
  const apiKey = window?._env_?.API_KEY ?? 'accessToken';
  const [currentApp, setCurrentApp] = useState('OccupationTransitionRoi');

  useEffect(() => {
    document.title = currentApp;
  }, [currentApp]);

  return (
    <Wrapper>
      <Navigation>
        <NavigationMenu
          id="remote-navigation"
          items={[
            {
              href: '#',
              icon: 'link-regular',
              name: 'App Library',
              onClick: function noRefCheck() {},
              selected: false,
              separator: true,
            },
            {
              href: '#',
              name: 'OccupationTransitionRoi',
              onClick: () => setCurrentApp('OccupationTransitionRoi'),
              selected: currentApp === 'OccupationTransitionRoi',
              separator: false,
            },
          ]}
          logo={{
            variant: 'api-platform',
          }}
          variant="left-navigation"
        />
      </Navigation>

      <Grid variant="with-navigation">
        {currentApp === 'OccupationTransitionRoi' && (
          <OccupationTransitionRoi accessToken={apiKey} />
        )}
      </Grid>
    </Wrapper>
  );
};

export default App;
