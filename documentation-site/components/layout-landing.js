/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {styled} from 'baseui';
import {MDXProvider} from '@mdx-js/tag';
import {Block} from 'baseui/block';
import MarkdownElements from './markdown-elements';
import HeaderNavigation from './header-navigation';
import Footer from './footer';

type PropsT = {
  children: React.Node,
  path?: {},
  toggleTheme: () => void,
};

const ContentWrapper = styled<{$isSidebarOpen: boolean}>(
  'div',
  ({$theme, $isSidebarOpen}) => ({
    boxSizing: 'border-box',
    display: $isSidebarOpen ? 'none' : 'block',
    paddingLeft: $theme.sizing.scale900,
    paddingRight: $theme.sizing.scale900,
    maxWidth: '100%',
    flex: 2,
    '@media screen and (min-width: 820px)': {
      display: 'block',
      maxWidth: '60em',
    },
  }),
);

class Layout extends React.Component<PropsT, {sidebarOpen: boolean}> {
  constructor(props: PropsT) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }
  render() {
    const {sidebarOpen} = this.state;
    const {toggleTheme, children} = this.props;
    return (
      <React.Fragment>
        <HeaderNavigation
          toggleSidebar={() =>
            this.setState(prevState => ({sidebarOpen: !prevState.sidebarOpen}))
          }
          toggleTheme={toggleTheme}
        />
        <Block
          backgroundColor="mono300"
          color="foreground"
          display="flex"
          justifyContent="center"
        >
          <ContentWrapper
            id="docSearch-content"
            role="main"
            $isSidebarOpen={sidebarOpen}
          >
            <MDXProvider components={MarkdownElements}>{children}</MDXProvider>
          </ContentWrapper>
        </Block>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Layout;