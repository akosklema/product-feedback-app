import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import TagContainer from './TagContainer';
import Tag from './Tag';

import classes from './CategoryTags.module.css';

function CategoryTags({ className }) {
  const [activeTag, setActiveTag] = useState('all');
  const [searchParam, setSearchParam] = useSearchParams();

  const categoryParam = searchParam.get('category');

  
  useEffect(() => {
    const categoryOptions = ['ui', 'ux', 'enhancement', 'bug', 'feature'];

    if (!categoryOptions.includes(categoryParam)) {
      setSearchParam({});
      setActiveTag('all');
    } else {
      setActiveTag(categoryParam);
    }
  }, [categoryParam, setSearchParam]);

  const activateTagHandler = (tag) => {
    setSearchParam({ category: tag });
  };

  return (
    <div className={`${classes['tag-container']} ${className}`}>
      <TagContainer activeTag={activeTag} activateTagHandler={activateTagHandler}>
        <Tag label="all" />
        <Tag label="ui" />
        <Tag label="ux" />
        <Tag label="enhancement" />
        <Tag label="bug" />
        <Tag label="feature" />
      </TagContainer>
    </div>
  );
};

export default CategoryTags;