import SectionContainer from "../reusable/SectionContainer";
import Book from "../shared/Book";

// thikache
const PopularBooks = ({ stationeries }) => {
  return (
    <section className="custom-container">
      {/* section header */}
      <SectionContainer
        title="স্টেশনারী পণ্য"
        className="bg-white md:p-8 p-3 shadow-md"
        line={true}
        sideBtn={{ url: "/subject/stationary", text: "আরো দেখুন" }}
      >
        {/* section content */}

        <div className="custom-container">
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 lg:gap-3 md:gap-3 gap-2">
            {/* items */}
            {stationeries
              .reverse()
              .slice(0, 6)
              .map((book, index) => {
                return <Book key={index} book={book}></Book>;
              })}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default PopularBooks;
