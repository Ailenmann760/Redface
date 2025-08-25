// frontend/src/components/ui/card.jsx

import React from 'react';
import { cva } from 'class-variance-authority';

const cardVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm');
const cardHeaderVariants = cva('flex flex-col space-y-1.5 p-6');
const cardTitleVariants = cva('text-2xl font-semibold leading-none tracking-tight');
const cardDescriptionVariants = cva('text-sm text-muted-foreground');
const cardContentVariants = cva('p-6 pt-0');
const cardFooterVariants = cva('flex items-center p-6 pt-0');

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cardVariants({ className })} {...props} />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cardHeaderVariants({ className })} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cardTitleVariants({ className })} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cardDescriptionVariants({ className })} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cardContentVariants({ className })} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cardFooterVariants({ className })} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
