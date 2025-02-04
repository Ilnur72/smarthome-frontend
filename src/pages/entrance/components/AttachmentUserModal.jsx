import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import Select from "react-select";
import AddUser from "./AddUser";

function AttachmentUser({ setIsOpen, isOpen, apartmentId }) {
  if (!isOpen) return null;
  const { handleSubmit, control, formState } = useForm();
  const queryClient = useQueryClient();

  const [addUserIsOpen, setAddUserIsOpen] = React.useState(false);

  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery(
    ["user", search],
    () =>
      axios
        .get(
          `/user?page[offset]=${1}&page[limit]=${10}&sort[by]=created_at&sort[order]=DESC&search=${search}`
        )
        .then((res) => res.data)
        .catch((e) => console.log(e)),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const onSubmit = async (formData) => {
    const result = await axios.post("/user-apartment", {
      user_id: formData.user_id.value,
      apartment_id: apartmentId,
    });
    if (result.data.success) {
      queryClient.invalidateQueries("entrance-detail");
    }
    setIsOpen(false);
  };

  return (
    <div>
      <AddUser
        setIsOpen={setAddUserIsOpen}
        isOpen={addUserIsOpen}
        apartmentIdFromParams={apartmentId}
        AttachmentUserIsOpen={setIsOpen}
      />
      <Modal
        hideBackdrop={false}
        open={addUserIsOpen ? !addUserIsOpen : isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block mb-2">Foydalanuvchini tanlang*</label>
            <Controller
              name="user_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={
                    search.length < 8
                      ? []
                      : data.data?.data?.map((item) => ({
                          value: item.id,
                          label: `${item.fullname} Tel:${item.phone} `,
                        }))
                  }
                  onChange={(e) => field.onChange(e)}
                  placeholder="Foydalanuvchini tanlang"
                  isSearchable
                  onInputChange={(inputValue) => setSearch(inputValue)} // Qidiruv so‘rovini API ga yuborish
                />
              )}
            />
          </div>
          <div className="grid mt-4 gap-3">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setAddUserIsOpen(true);
              }}
            >
              Yangi user qo'shish
            </Button>
            <div className="flex justify-between">
              <Button
                variant="outlined"
                onClick={() => setIsOpen(false)}
                type="button"
                sx={{
                  borderRadius: "4px",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  color: "#fff",
                  borderRadius: "4px",
                }}
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? "Loading..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AttachmentUser;
