import {
  Button,
  Modal,
  Switch,
  TextField,
  Typography,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import Select from "react-select";
import AddUser from "./AddUser";

function AttachmentUser({ setIsOpen, isOpen, apartmentId }) {
  if (!isOpen) return null;

  const { handleSubmit, control, formState, watch, setValue } = useForm();
  const queryClient = useQueryClient();

  const [addUserIsOpen, setAddUserIsOpen] = React.useState(false);
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [enableInput, setEnableInput] = useState(false);

  const getModalStyle = () => {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: "24rem",
      padding: "2.5rem",
      borderRadius: "0.75rem",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    };
  };

  const goToNextStep = (formData) => {
    setStep(2);
    setFirstStepData(formData);
  };

  const [firstStepData, setFirstStepData] = useState(null);

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

  const onFinalSubmit = async (formData) => {
    try {
      const finalData = {
        user_id: firstStepData.user_id.value,
        apartment_id: apartmentId,
        ...(enableInput && formData.car_count
          ? { car_count: +formData.car_count, parking_service: enableInput }
          : { parking_service: enableInput }),
      };
      const result = await axios.post("/user-apartment", finalData);

      if (result.data.success) {
        queryClient.invalidateQueries("entrance-detail");
      }

      setStep(1);
      setIsOpen(false);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
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
        onClose={() => {
          setStep(1);
          setIsOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          {step === 1 && (
            <form style={getModalStyle()} onSubmit={handleSubmit(goToNextStep)}>
              <div>
                <label className="block mb-2">Foydalanuvchini tanlang*</label>
                <Controller
                  name="user_id"
                  control={control}
                  rules={{ required: "Foydalanuvchini tanlash majburiy" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        options={
                          search.length < 8
                            ? []
                            : data?.data?.data?.map((item) => ({
                                value: item.id,
                                label: `${item.fullname} Tel:${item.phone} `,
                              }))
                        }
                        onChange={(e) => field.onChange(e)}
                        placeholder="Foydalanuvchini tanlang"
                        isSearchable
                        onInputChange={(inputValue) => setSearch(inputValue)}
                      />
                      {error && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.message}
                        </p>
                      )}
                    </>
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
                    {formState.isSubmitting ? "Loading..." : "Next"}
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Display second modal if step is 2 */}
          {step === 2 && (
            <form
              style={getModalStyle()}
              onSubmit={handleSubmit(onFinalSubmit)}
            >
              <Typography variant="h6" component="h2" className="mb-4">
                Qo'shimcha sozlamalar
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={enableInput}
                    onChange={(e) => setEnableInput(e.target.checked)}
                    color="primary"
                  />
                }
                label="Parking uchun ruhsat berish"
              />

              <Controller
                name="car_count"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    label="Transport sonini kiriting"
                    min={1}
                    max={10}
                    variant="outlined"
                    fullWidth
                    type="number"
                    disabled={!enableInput}
                    sx={{ mt: 2 }}
                  />
                )}
              />

              <div className="flex justify-between mt-4">
                <Button
                  variant="outlined"
                  onClick={() => setStep(1)}
                  type="button"
                  sx={{
                    borderRadius: "4px",
                  }}
                >
                  Orqaga
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
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default AttachmentUser;
