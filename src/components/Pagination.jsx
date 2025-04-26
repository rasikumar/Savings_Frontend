// components/Pagination.jsx

import { Button } from "@/components/ui/button";

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button onClick={onPrevious} disabled={currentPage === 1} className="h-9">
        Previous
      </Button>
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <Button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="h-9"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
