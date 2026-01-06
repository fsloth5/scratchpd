import React from "react";

interface ImageLinkProps {
  id?: string;
  imageDescription: string;
  image: string;
  url: string;
}

export default function ImageLink(props: ImageLinkProps): JSX.Element {
  return (
    <a id={props.id} href={props.url} target="_blank" rel="noopener noreferrer">
      <img src={props.image} alt={props.imageDescription} />
    </a>
  );
}

export function GithubRibbon(): JSX.Element {
  return (
    <a
      href="https://github.com/fsloth5/scratchpad.git"
      target="_blank"
      rel="noopener noreferrer">
      <img
        loading="lazy"
        decoding="async"
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png"
        className="attachment-full size-full"
        alt="Fork me on GitHub"
      />
    </a>
  );
}
