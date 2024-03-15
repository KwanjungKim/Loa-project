import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";

// hooks
import useAllArticles from "@hooks/useAllArticles";
import RaidsView, { RaidsViewProps } from "./RaidsView";

export interface IFormValues {
  proficiency: "트라이" | "클경" | "반숙" | "숙련" | "";
  raid_difficulty: "normal" | "hard" | "extreme" | "";
  raid_leader: string;
  startDate: string;
  minGate: "1" | "2" | "3" | "4" | "";
  maxGate: "1" | "2" | "3" | "4" | "";
  title: string;
}

const defaultFormValues: IFormValues = {
  proficiency: "",
  raid_difficulty: "",
  raid_leader: "",
  startDate: dayjs().format("YYYY-MM-DD"),
  minGate: "",
  maxGate: "",
  title: "",
};

type IRaidType =
  | "발탄"
  | "비아키스"
  | "쿠크세이튼"
  | "아브렐슈드"
  | "일리아칸"
  | "카멘"
  | "에키드나"
  | "상아탑"
  | "카양겔";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  type: IRaidType | "";
  resetType: () => void;
}

export default function Raids({ type, resetType, ...props }: Props) {
  const navigate = useNavigate();
  const handleViewDetail = useCallback(
    (boardNumber: number) => {
      navigate(`/raid/${boardNumber}`);
    },
    [navigate],
  );
  const methods = useForm({
    defaultValues: defaultFormValues,
  });
  const [showDetail, setShowDetail] = useState(false);
  function toggleShowDetail() {
    setShowDetail((prev) => !prev);
  }

  const { status, articles, handleSearchParams } = useAllArticles(type);

  const handleSubmitData = useCallback(
    (formData: IFormValues) => {
      if (
        formData.minGate !== "" &&
        formData.maxGate !== "" &&
        Number(formData.minGate) > Number(formData.maxGate)
      ) {
        alert("최소 관문은 최대 관문보다 클 수 없습니다.");
        return;
      }

      const isBeforeToday = dayjs(formData.startDate).isBefore(
        dayjs().format("YYYY-MM-DD"),
      );
      const isAfterThirtyDays = dayjs(formData.startDate).isAfter(
        dayjs().add(29, "day").format("YYYY-MM-DD"),
      );

      if (isBeforeToday || isAfterThirtyDays) {
        alert("시작일은 오늘부터 30일 이내여야 합니다.");
        return;
      }

      handleSearchParams({ ...formData, type });
    },
    [type, handleSearchParams],
  );

  const raidsViewProps: RaidsViewProps = useMemo(
    () => ({
      articles,
      status,
      showDetail,
      toggleShowDetail,
      handleSubmitData,
      resetType,
      handleViewDetail,
    }),
    [
      articles,
      status,
      showDetail,
      handleSubmitData,
      resetType,
      handleViewDetail,
    ],
  );

  return (
    <FormProvider {...methods}>
      <RaidsView {...raidsViewProps} {...props} />
    </FormProvider>
  );
}
