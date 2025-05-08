import { useState } from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";

interface Card {
  id: string;
  content: string;
  image: string;
  designation: string;
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

interface Columns {
  [key: string]: Column;
}

const initialCards: Card[] = [
  {
    id: "1",
    content: "John Doe",
    image: "https://i.pravatar.cc/150?img=1",
    designation: "Developer",
  },
  {
    id: "2",
    content: "Jane Smith",
    image: "https://i.pravatar.cc/150?img=2",
    designation: "Designer",
  },
  {
    id: "3",
    content: "Mike Johnson",
    image: "https://i.pravatar.cc/150?img=3",
    designation: "Manager",
  },
];

const initialColumns: Columns = {
  top: {
    id: "top",
    title: "Profile Cards",
    cards: initialCards,
  },
  project1: {
    id: "project1",
    title: "Project 1",
    cards: [],
  },
  project2: {
    id: "project2",
    title: "Project 2",
    cards: [],
  },
  project3: {
    id: "project3",
    title: "Project 3",
    cards: [],
  },
};

export const DragAndDrop = () => {
  const [columns, setColumns] = useState<Columns>(initialColumns);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceCards = [...sourceColumn.cards];
      const destCards = [...destColumn.cards];
      const [removed] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          cards: sourceCards,
        },
        [destination.droppableId]: {
          ...destColumn,
          cards: destCards,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedCards = [...column.cards];
      const [removed] = copiedCards.splice(source.index, 1);
      copiedCards.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          cards: copiedCards,
        },
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Drag and Drop Board
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              minHeight: 200,
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <Droppable droppableId="top" direction="horizontal">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ display: "flex", gap: 2, width: "100%" }}
                >
                  {columns.top.cards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                    >
                      {(provided) => (
                        <Paper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ p: 2, width: 200, cursor: "grab" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              src={card.image}
                              sx={{ width: 80, height: 80, mb: 1 }}
                            />
                            <Typography variant="h6">{card.content}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {card.designation}
                            </Typography>
                          </Box>
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {["project1", "project2", "project3"].map((columnId) => (
              <Box
                key={columnId}
                sx={{
                  flex: 1,
                  minHeight: 400,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ height: "100%" }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {columns[columnId].title}
                      </Typography>
                      {columns[columnId].cards.map((card, index) => (
                        <Draggable
                          key={card.id}
                          draggableId={card.id}
                          index={index}
                        >
                          {(provided) => (
                            <Paper
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ p: 2, mb: 1, cursor: "grab" }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Avatar
                                  src={card.image}
                                  sx={{ width: 40, height: 40 }}
                                />
                                <Box>
                                  <Typography variant="subtitle1">
                                    {card.content}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {card.designation}
                                  </Typography>
                                </Box>
                              </Box>
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Box>
            ))}
          </Box>
        </Box>
      </DragDropContext>
    </Box>
  );
};
