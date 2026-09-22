interface CardContainerProps {
  children: React.ReactNode;
}

function CardContainer({
  children
}: CardContainerProps) {
  return (
    <div className="card-container">
      {children}
    </div>
  );
}

export default CardContainer;