import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./infoGeneral.styles";
import Inputs from "../../inputs/inputs";
import SearchSelect from "../../select/searchSelect/select";
import { listDocumentType } from "@/utils/listUtils";
import DateSelect from "../../select/dateSelect/dateSelect";
import { formatDate, formatDateWithoutSlash, formatNames } from "@/utils/fomatDate";
import ButtonsPrimary from "../../buttons/buttonPrimary/button";
import { getData, setData } from "@/utils/storageUtils";
import { validateEmail, validatePhone, validateDocumentNumber} from "@/utils/validationForms";
import InfoModal from "@/components/modals/infoModal/infoModal";
import { AnimatePresence } from "moti";
import FadeInOut from "@/components/animations/fade/fadeInOut";

interface BasicInfoProps{
    onSubmit: (data: any) => void;
}

export default function InfoGeneral({ onSubmit }: BasicInfoProps) {
   
    return (
        <AnimatePresence>
            <View></View>
        </AnimatePresence>
    );
}