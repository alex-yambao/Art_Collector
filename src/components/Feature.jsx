import React, { Fragment } from "react";
import { fetchQueryResultsFromTermAndValue } from "../api";

const Searchable = ({
  searchTerm,
  searchValue,
  setIsLoading,
  setSearchResults,
}) => {
  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await fetchQueryResultsFromTermAndValue(
        searchTerm,
        searchValue
      );
      setSearchResults(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <span className="content">
        <a href="/#" onClick={handleClick}>
          {searchValue}
        </a>
      </span>
    </Fragment>
  );
};

const Feature = ({ featuredResult, setIsLoading, setSearchResults }) => {
  if (!featuredResult) {
    return <main id="feature"></main>;
  }

  const {
    title,
    dated,
    images,
    primaryimageurl,
    description,
    culture,
    style,
    technique,
    medium,
    dimensions,
    people,
    department,
    division,
    contact,
    creditline,
  } = featuredResult;

  const factBody = (title, content, searchable) => {
    if (!content) {
      return;
    }
    return (
      <Fragment>
        <span className="title">{title}</span>
        {searchable ? (
          <Searchable
            searchTerm={title.toLowerCase()}
            searchValue={content}
            setIsLoading={setIsLoading}
            setSearchResults={setSearchResults}
          />
        ) : (
          <span className="content">{content}</span>
        )}
      </Fragment>
    );
  };

  return (
    <>
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{title ? title : null}</h3>
          <h4>{dated ? dated : null}</h4>
        </header>
        <section className="facts">
          {factBody("Description", description, false)}
          {factBody("Culture", culture, true)}
          {factBody("Style", style, false)}
          {factBody("Technique", technique, true)}
          {factBody("Medium", medium ? medium.toLowerCase : null, true)}
          {factBody("Dimensions", dimensions, false)}
          {people
            ? people.map((person, index) => {
                return (
                  <Fragment key={index}>
                    {factBody("Person", person.displayname, true)}
                  </Fragment>
                );
              })
            : ""}
          {factBody("Department", department, false)}
          {factBody("Division", division, false)}
          {factBody(
            "Contact",
            <a target="_blank" rel="noopener noreferrer" href={`mailto:${contact}`}>
              {contact}
            </a>,
            false
          )}
          {factBody("Creditline", creditline, false)}
        </section>

        <section className="photos">
          {images
            ? images.map((image, index) => {
                return <img key={index} src={primaryimageurl} alt={title} />;
              })
            : null}
        </section>
      </div>
    </main>
    </>
  );
};

export default Feature;
