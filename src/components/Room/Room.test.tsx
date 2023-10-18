import { render, screen, fireEvent } from "@testing-library/react";
import RoomCard from "./RoomCard.tsx"; // Asegúrate de importar el componente correctamente

// Define props de ejemplo
const mockRoom = {
  name: "Sala de ejemplo",
  participants: 5,
  onClickJoin: () => console.log("@"),
};

// Test suite para RoomCard
describe("RoomCard Component", () => {
  it("debe mostrar el nombre y la cantidad de participantes correctamente", () => {
    render(<RoomCard {...mockRoom} />);

    // Asegúrate de que el nombre y la cantidad de participantes se muestren correctamente
    expect(screen.getByText("Sala de ejemplo")).toBeInTheDocument();
    expect(screen.getByText("Participantes: 5")).toBeInTheDocument();
  });

  it("debe llamar a la función onClickJoin al hacer clic en el botón", () => {
    render(<RoomCard {...mockRoom} />);

    // Simula un clic en el botón "Unirme"
    fireEvent.click(screen.getByText("Unirme"));
  });
});
