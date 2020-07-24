import React, { useEffect, useState } from 'react';

// Bug in CRA webpack setup is making it impossible to use inline SVG as reactcomponents like the docs instruct
// https://github.com/facebook/create-react-app/issues/5276
// https://stackoverflow.com/questions/61339259/how-to-dynamically-import-svg-and-render-it-inline
// Possibly there is something weird about our config that's causing this behavior, but I couldn't find it
type SVGInlineProps = {
  url: string;
  svgProps?: React.SVGProps<SVGSVGElement>;
}

// TODO: FIGURE OUT HOW TO USE SVGPROPS
export default ({ url, svgProps }: SVGInlineProps) => {
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(setSvg)
  }, [url]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
