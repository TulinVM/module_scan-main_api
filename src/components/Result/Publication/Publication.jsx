import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments, dropDocumentsInfo } from "../../Requests/histograms";
import "./Publication.css";
import { convertDocObjectToCard } from "./RenderDoc";
import Badge from "react-bootstrap/Badge";

const PublicationCards = () => {
  const dispatch = useDispatch();
  const { publicationIds, documents } = useSelector((state) => ({
    publicationIds: state.histograms.publicationIds,
    documents: state.histograms.documents,
  }));

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (publicationIds.length) {
      dispatch(dropDocumentsInfo());

      const idsForRequest = publicationIds.slice(offset, offset + 10);
      if (idsForRequest.length) {
        dispatch(getDocuments({ ids: idsForRequest }));
      }
    }
  }, [dispatch, publicationIds, offset]);

  const showMoreArticles = useCallback(() => {
    setOffset((prevOffset) => prevOffset + 10);
  }, []);

  if (!documents.length) {
    return null;
  }

  const docs = convertDocObjectToCard(documents);
  const isAllLoaded = documents.length >= publicationIds.length;

  return (
    <>
      <div className="publication">
        {docs.map((doc, index) => (
          <div className="publication_content" key={index}>
            <div className="publication_date">
              <span className="publication_span">{doc.date}</span>
              <a className="publication_article" href={doc.articleUrl}>
                {doc.articleUrlTitle}
              </a>
            </div>
            <h4 className="publication_title">{doc.articleTitle}</h4>
            {doc.articleTags && doc.articleTags.length > 0 ? (
              doc.articleTags.map((tag) => (
                <Badge bg="warning" text="dark" key={tag}>
                  {tag}
                </Badge>
              ))
            ) : (
              <Badge bg="warning" text="dark">
                Тег не найден
              </Badge>
            )}
            {doc.imageUrl && (
              <img
                className="publication_img"
                src={doc.imageUrl}
                alt="article pic"
              />
            )}
            <div
              className="publication_contentText"
              dangerouslySetInnerHTML={{ __html: doc.articleContent }}
            />
            <div className="publication_button">
              <form action={doc.articleUrl} target="_blank">
                <button className="publication_btn">Читать источник</button>
              </form>
              <section className="publication_section">
                {doc.wordCount} слов
              </section>
            </div>
          </div>
        ))}
      </div>
      {!isAllLoaded && (
        <div className="addBox">
          <button onClick={showMoreArticles} className="publication_showBtn">
            Показать больше
          </button>
        </div>
      )}
    </>
  );
};

export default PublicationCards;
