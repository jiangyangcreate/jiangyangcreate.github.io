import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import React from 'react';
import Box from '@mui/material/Box';

function MyComponent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '79vh',}}>
      <h1>Hello , World</h1>
    </Box>
  );
}

export default function Title() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      description={siteConfig.tagline}
      keywords={siteConfig.customFields.keywords}
      wrapperClassName="es-navbar-white"
    >
     <MyComponent/>
    </Layout>
  );
}
