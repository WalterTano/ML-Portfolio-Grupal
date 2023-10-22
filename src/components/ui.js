import { Link as GatsbyLink } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import isAbsoluteURL from "is-absolute-url"
import * as React from "react"
import * as styles from "./ui.css"
import { extractLink } from './helper';

export const cx = (...args) => args.filter(Boolean).join(" ")

export function Base({
  as: Component = "div",
  cx: _cx = [],
  className,
  ...props
}) {
  return <Component className={cx(..._cx, className)} {...props} />
}

export function Container({ width = "normal", ...props }) {
  return <Base cx={[styles.containers[width]]} {...props} />
}

export function Flex({
  variant,
  gap = 3,
  gutter,
  wrap,
  responsive,
  marginY,
  alignItems,
  cx: _cx = [],
  ...props
}) {
  return (
    <Base
      cx={[
        styles.flex,
        variant && styles.flexVariants[variant],
        responsive && styles.flexVariants.responsive,
        wrap && styles.flexVariants.wrap,
        gutter && styles.gutter[gutter],
        gutter ? styles.flexGap[0] : styles.flexGap[gap],
        marginY && styles.marginY[marginY],
        alignItems && styles.flexVariants[alignItems],
        ..._cx,
      ]}
      {...props}
    />
  )
}

export function Box({
  width = "full",
  background,
  padding,
  paddingY,
  radius,
  center = false,
  order,
  cx: _cx = [],
  ...props
}) {
  return (
    <Base
      cx={[
        styles.widths[width],
        background && styles.backgrounds[background],
        padding && styles.padding[padding],
        paddingY && styles.paddingY[paddingY],
        radius && styles.radii[radius],
        center && styles.box.center,
        order && styles.order[order],
        ..._cx,
      ]}
      {...props}
    />
  )
}

export function FlexList(props) {
  return <Flex as="ul" cx={[styles.list]} {...props} />
}

export function List(props) {
  return <Base as="ul" cx={[styles.list]} {...props} />
}

export function Space({ size = "auto", ...props }) {
  return <Base cx={[styles.margin[size]]} {...props} />
}

export function Nudge({ left, right, top, bottom, ...props }) {
  return (
    <Base
      cx={[
        left && styles.marginLeft[-left],
        right && styles.marginRight[-right],
        top && styles.marginTop[-top],
        bottom && styles.marginBottom[-bottom],
      ]}
      {...props}
    />
  )
}

export function Section(props) {
  return <Box as="section" className={styles.section} {...props} />
}

export function Text({
  variant = "body",
  center = false,
  bold = false,
  color = 'text',
  margin = undefined,
  ...props
}) {
  const text = typeof props.children === 'string' ? props.children : '';
  const link = extractLink(text);

  if (link && link.label && link.url) {
    return LinkText({ variant, center, bold, color, margin, link, ...props });
  }

  return (
    <Base
      cx={[
        styles.text[variant],
        styles.color[color],
        center && styles.text.center,
        bold && styles.text.bold,
        margin && styles.text.bottom[margin]
      ]}
      { ...props }
    />
  )
}

export function LinkText({
  variant = "body",
  center = false,
  bold = false,
  color = 'text',
  margin = undefined,
  link = undefined,
  ...props
}) {
  if (!link) {
    return <></>;
  }

  return (
    <>
      <Base
        cx={[
          styles.text[variant],
          styles.color[color],
          center && styles.text.center,
          bold && styles.text.bold,
          margin && styles.text.bottom[margin],
        ]}
        { ...props }
      >
        { 
          link.beforeLink && 
            <Base
              as="span"
              { ...{ ...props, children: link.beforeLink } }
            />
        }
        <Base
          as="a"
          href={link.url}
          { ...{ ...props, children: link.label } }
        />
        {
          link.afterLink && 
            <Base
              as="span"
              { ...{ ...props, children: link.afterLink } }
            />
        }
      </Base>
    </>
  );
}

export function MultiLineText({
  variant = "body",
  center = false,
  bold = false,
  color = 'text',
  minMargin = 1,
  maxMargin = 3,
  ...props
}) {
  let textContent = [ props.children ];
  if (typeof props.children === 'string') {
    textContent = props.children.split('\n');
  }

  const items = [];
  textContent.forEach((text, i, arr) => {
    if (typeof text !== 'string' || text.trim() === '') return;

    items.push(
      <Text
        variant={variant}
        center={center}
        bold={bold}
        color={color}
        margin={i === arr.length - 1 ? maxMargin : minMargin}
        { ...{ ...props, children: text } }
      />
    );
  });

  return (
    <>
      {items}
    </>
  )
}

export function SuperHeading({ ...props }) {
  return <Text as="h1" variant="superHeading" {...props} />
}

export function Heading({ ...props }) {
  return <Text as="h2" variant="heading" {...props} />
}

export function Subhead({ ...props }) {
  return <Text as="h3" variant="subhead" {...props} />
}

export function Kicker({ ...props }) {
  return <Text variant="kicker" {...props} />
}

export function Link({ to, href, ...props }) {
  const url = href || to || ""
  if (isAbsoluteURL(url)) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a href={url} className={styles.link} {...props} />
    )
  }
  return <GatsbyLink to={url} className={styles.link} {...props} />
}

export function NavLink({ ...props }) {
  return <Base as={Link} cx={[styles.navlink]} {...props} />
}

export function NavButtonLink({ ...props }) {
  return <Base as="button" cx={[styles.navButtonlink]} {...props} />
}

export function Button({ variant = "primary", color = undefined, ...props }) {
  console.log(color);
  return <Base 
    as={Link} 
    cx={[
      styles.buttons[variant],
      color && styles.backgrounds[color]
    ]} 
    {...props} 
  />
}

export function ButtonList({ links = [], reversed = false, ...props }) {
  const getVariant = (i) => {
    if (reversed) {
      return i === 0 ? "reversed" : "linkReversed"
    }
    return i === 0 ? "primary" : "link"
  }
  console.log(links);
  return (
    <FlexList marginY={4} {...props}>
      {links &&
        links.map((link, i) => (
          <li key={link.id}>
            <Button 
              href={link.href} 
              variant={getVariant(i)}
              color={link.color}
            >
              {link.text}
            </Button>
          </li>
        ))}
    </FlexList>
  )
}

export function CTALink(props) {
  return <Base as={Link} cx={[styles.ctaLink]} {...props} />
}

export function LinkList({ links = [], ...props }) {
  return (
    <FlexList {...props}>
      {links &&
        links.map((link, i) => (
          <li key={link.id}>
            <CTALink href={link.href}>{link.text}</CTALink>
          </li>
        ))}
    </FlexList>
  )
}

export function Blockquote(props) {
  return <Base as="blockquote" cx={[styles.blockquote]} {...props} />
}

export function Avatar({ alt, image }) {
  return (
    <GatsbyImage alt={alt} image={getImage(image)} className={styles.avatar} />
  )
}

export function Logo({ alt, image, size = "small" }) {
  return (
    <GatsbyImage
      alt={alt}
      image={getImage(image)}
      className={styles.logos[size]}
    />
  )
}

export function Icon({ alt, image, size = "medium" }) {
  return (
    <GatsbyImage
      alt={alt}
      image={getImage(image)}
      className={styles.icons[size]}
    />
  )
}

export function IconLink(props) {
  return <NavLink cx={[styles.iconLink]} {...props} />
}

export function InteractiveIcon(props) {
  return <Base as="button" cx={[styles.interactiveIcon]} {...props} />
}

export function VisuallyHidden(props) {
  return <Base as="span" cx={[styles.visuallyHidden]} {...props} />
}

export function BlockLink(props) {
  return <Link className={styles.blockLink} {...props} />
}
