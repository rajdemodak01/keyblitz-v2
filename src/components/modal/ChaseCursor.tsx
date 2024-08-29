import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import Close from "@/images/close.svg";
import { setCursors } from "@/lib/features/ghostCursor/ghostCursor";

type Props = {};

const ChaseCursor = (props: Props) => {
  const { cursors } = useAppSelector((state) => state.ghostCursor);
  const [newCursor, setNewCursor] = React.useState({ name: "", wpm: 0 });
  const dispatch = useAppDispatch();

  return (
    <div className=" p-4  ">
      <div className=" flex flex-col">
        {cursors.map((cursor, i) => (
          <div
            className=" flex gap-2 items-center shadow-[inset_0_0_0_1px] shadow-transparent hover:shadow-border rounded-xl  "
            key={i}
          >
            <div className=" flex-1 flex justify-between border-b border-border py-4 mx-4 ">
              <p>{cursor.name}</p>
              <div className=" flex gap-4 items-center ">
                <div className=" border-l border-border pl-4 ">
                  <p>{cursor.wpm}</p>
                </div>
                <div
                  className=" border-l border-border text-foreground-light pl-4 cursor-pointer "
                  onClick={() => {
                    dispatch(
                      setCursors({
                        cursors: cursors.filter((_, index) => index !== i),
                      })
                    );
                  }}
                >
                  <Close width="16" />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className=" flex gap-2 items-center shadow-[inset_0_0_0_1px] shadow-transparent hover:shadow-border rounded-xl  ">
          <div className="flex-1 flex justify-between border-b border-border py-4 mx-4 ">
            <input
              type="text"
              className=" w-full pr-4 bg-transparent outline-none"
              placeholder="Enter the cursor name"
              value={newCursor.name}
              onChange={(e) =>
                setNewCursor({ ...newCursor, name: e.target.value })
              }
            />
            <div className=" flex gap-4 items-center ">
              <div className=" border-l border-r border-border px-4 ">
                <input
                  type="number"
                  min={1}
                  max={150}
                  value={newCursor.wpm}
                  onChange={(e) =>
                    setNewCursor({ ...newCursor, wpm: Number(e.target.value) })
                  }
                  className=" w-10 bg-transparent outline-none"
                  placeholder="WPM"
                />
              </div>
              <div
                className=" self-center rotate-45 text-foreground-light  cursor-pointer "
                onClick={() => {
                  dispatch(
                    setCursors({
                      cursors: [
                        ...cursors,
                        {
                          letterIndex: 0,
                          name: newCursor.name,
                          wordIndex: 0,
                          wpm: newCursor.wpm,
                        },
                      ],
                    })
                  );
                  setNewCursor({ name: "", wpm: 0 });
                }}
              >
                <Close width="16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChaseCursor;
