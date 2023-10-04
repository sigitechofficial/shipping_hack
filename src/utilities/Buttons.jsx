import { Tooltip } from "@chakra-ui/react";
import React from "react";
import {
  BsCheckLg,
  BsExclamationLg,
  BsEyeFill,
  BsQuestionLg,
  BsRecycle,
} from "react-icons/bs";
import { HiArrowLeft } from "react-icons/hi";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export default function AddButton(props) {
  return (
    <button
      onClick={() => props.modal(true)}
      className="py-2.5 px-12 rounded bg-themeBlue font-medium text-base text-white border border-themeBlue hover:bg-transparent hover:text-themeBlue"
    >
      Add {props.text}
    </button>
  );
}

export function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center gap-x-2 font-medium text-base text-white bg-themeBlue py-2.5 px-5 border border-themeBlue rounded hover:bg-transparent hover:text-themeBlue"
    >
      <HiArrowLeft />
      Back
    </button>
  );
}

export function TabButton(props) {
  return (
    <button
      onClick={() => props.set(props.text)}
      className={`font-medium text-xl px-5 py-2.5 ${
        props.tab === props.text
          ? "bg-themeBlue text-white"
          : "text-themeBlue bg-transparent"
      } ${props.width} border border-themeBlue`}
    >
      {props.text}
    </button>
  );
}

export function ModalButtons(props) {
  return (
    <div className="flex justify-end gap-x-2">
      <button
        type="button"
        onClick={props.close}
        className="py-2.5 w-24 rounded font-medium text-sm text-themeBlue border border-themeBlue hover:bg-themeBlue hover:text-white"
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={props.action}
        disabled={props.disabled}
        className="py-2.5 w-24 rounded font-medium text-sm text-white bg-themeBlue border border-themeBlue hover:bg-transparent hover:text-themeBlue"
      >
        {props.text}
      </button>
    </div>
  );
}

export function DTApproved() {
  return (
    <button
      className={`text-white bg-themeBlue border-themeBlue hover:bg-transparent hover:text-themeBlue py-2.5 px-5 rounded-md border`}
    >
      Approved
    </button>
  );
}

export function DTPending() {
  return (
    <button
      className={`text-black bg-themeOrange border-themeOrange hover:bg-transparent hover:text-themeOrange py-2.5 px-5 rounded-md border`}
    >
      Pending
    </button>
  );
}

export function DTRejected() {
  return (
    <button
      className={`text-white bg-red-600 border-red-600 hover:bg-transparent hover:text-red-600 py-2.5 px-5 rounded-md border`}
    >
      Rejected
    </button>
  );
}

export function DTApprove(props) {
  return (
    <Tooltip label="Approve Driver" aria-label="A tooltip">
      <button
        onClick={props.approve}
        disabled={props.disabled}
        className={`text-themeOrange border-themeOrange hover:bg-themeOrange hover:text-white p-1 rounded-fullest border-2`}
      >
        <BsCheckLg />
      </button>
    </Tooltip>
  );
}

export function DTReject(props) {
  return (
    <Tooltip label="Reject Driver" aria-label="A tooltip">
      <button
        onClick={props.reject}
        disabled={props.disabled}
        className={`text-red-600 border-red-600 hover:bg-red-600 hover:text-white p-1 rounded-fullest border-2`}
      >
        <RxCross2 />
      </button>
    </Tooltip>
  );
}

export function DTView(props) {
  return (
    <Tooltip label="View Details" aria-label="A tooltip">
      <button
        onClick={props.view}
        disabled={props.disabled}
        className={`text-gray-500 border-gray-500 hover:bg-gray-500 hover:text-white p-1 rounded-fullest border-2 `}
      >
        <BsEyeFill />
      </button>
    </Tooltip>
  );
}

export function DTEdit(props) {
  return (
    <Tooltip label="Edit" aria-label="A tooltip">
      <button
        onClick={props.edit}
        disabled={props.disabled}
        className={`text-themeBlue border-themeBlue hover:bg-themeBlue hover:text-white p-1 rounded-fullest border-2`}
      >
        <MdModeEditOutline />
      </button>
    </Tooltip>
  );
}

export function DTQuestion(props) {
  return (
    <Tooltip label="Complete Registration" aria-label="A tooltip">
      <button
        onClick={props.question}
        disabled={props.disabled}
        className={`text-black border-black hover:bg-black hover:text-white p-1 rounded-fullest border-2`}
      >
        <BsQuestionLg />
      </button>
    </Tooltip>
  );
}

export function DTVerify(props) {
  return (
    <Tooltip label="Approve" aria-label="A tooltip">
      <button
        onClick={props.verify}
        className={`text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-white p-1 rounded-fullest border-2`}
      >
        <BsExclamationLg />
      </button>
    </Tooltip>
  );
}

export function DTDel(props) {
  return (
    <Tooltip label="Delete" aria-label="A tooltip">
      <button
        onClick={props.del}
        disabled={props.disabled}
        className={`text-red-600 border-red-600 hover:bg-red-600 hover:text-white p-1 rounded-fullest border-2`}
      >
        <RiDeleteBinLine />
      </button>
    </Tooltip>
  );
}

export function DTResend(props) {
  return (
    <Tooltip label="Re-send" aria-label="A tooltip">
      <button
        onClick={props.resend}
        disabled={props.disabled}
        className={`text-themeOrange border-themeOrange hover:bg-themeOrange hover:text-white p-1 rounded-fullest border-2`}
      >
        <BsRecycle />
      </button>
    </Tooltip>
  );
}
