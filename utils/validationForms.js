export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
};

export const validateDocumentNumber = (documentNumber) => {
    const regex = /^[0-9]+$/;
    return regex.test(documentNumber);
};

export const formatCurrency = (value) => {
    const newValue = value.replace(/^\$/, '');
    const numberValue = parseFloat(newValue.replaceAll('.', ''));
    if (isNaN(numberValue)) return '';
    return numberValue.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
};

export const validateNumber = (value) => {
    const newValue = value.replace(/^\$/, '');
    const numberValue = parseFloat(newValue.replaceAll('.', ''));
    if (isNaN(numberValue)) return '';
    return Number(numberValue);
};

export function transformDataDbm(input) {
    const output = {
        operacion: "C",
        entidad: input.entidad,
        oficina: input.oficina,
        modalidad: input.modalidad || "0",
        tipo_pers: input.tipo_pers,
        fecha_vincul_client: input.fecha_vincul_client,
        ciud_muni: input.ciud_muni,
        nombre1: input.nombre1,
        nombre2: input.nombre2 || "",
        apellido1: input.apellido1,
        apellido2: input.apellido2 || "",
        genero: input.genero,
        tipo_doc: input.tipo_doc,
        no_docum: input.no_docum,
        expedida_en: input.expedida_en,
        fecha_exp: input.fecha_exp,
        lug_nac: input.lug_nac,
        fecha_nac: input.fecha_nac,
        dire_domi: input.dire_domi,
        barrio: input.barrio,
        numero_celular: input.numero_celular,
        correo: input.correo,
        env_extractos: "C",
        env_cert_costos: "C",
        auta_env_sms: input.auta_env_sms,
        aut_env_email: input.aut_env_email,
        id_usuario: input.entidad,
        contrasena: input.pin || "",
        departamento: input.ciud_muni.substring(0, 2)
    };

    return output;
}

export function transformData(input) {
    const output = {
        operacion: "C",
        entidad: input.entidad,
        oficina: input.oficina,
        modalidad: input.modalidad || "0",
        tipo_pers: input.tipo_pers,
        fecha_vincul_client: input.fecha_vincul_client,
        ciud_muni: input.ciud_muni,
        nombre1: input.nombre1,
        nombre2: input.nombre2 || "",
        apellido1: input.apellido1,
        apellido2: input.apellido2 || "",
        genero: input.genero,
        tipo_doc: input.tipo_doc,
        no_docum: input.no_docum,
        expedida_en: input.expedida_en,
        fecha_exp: input.fecha_exp,
        estado_civil: parseInt(input.estado_civil, 10),
        niv_edu: input.niv_edu,
        lug_nac: input.lug_nac,
        fecha_nac: input.fecha_nac,
        zon_ubi: input.zon_ubi,
        dire_domi: input.dire_domi,
        barrio: input.barrio,
        numero_celular: input.numero_celular,
        correo: input.correo,
        ocupacion: parseInt(input.ocupacion, 10),
        extrenjero: parseInt(input.extrenjero, 10),
        tip_vivien: input.tip_vivien,
        acti_CIIU: input.acti_CIIU,
        desc_CIIU: input.desc_CIIU,
        Nom_empre_neg: input.Nom_empre_neg,
        Tipo_emp_neg: input.Tipo_emp_neg,
        cargo: input.cargo,
        dire_empre_neg: input.dire_empre_neg.trim(),
        ciu_empre_neg: input.ciu_empre_neg,
        tel_empre_neg: input.tel_empre_neg || "",
        Expu_publi: input.Expu_publi,
        Reco_publi: input.Reco_publi,
        fam_peps_nombres: input.fam_peps_nombres || "",
        fam_peps_paren: input.fam_peps_paren || "",
        mes_info_finan: input.mes_info_finan,
        declarante: input.declarante,
        ingre_mes: parseInt(input.ingre_mes.replace(/[^0-9]/g, ''), 10),
        otro_ingre: parseInt(input.otro_ingre.replace(/[^0-9]/g, ''), 10),
        total_ingre: parseInt(input.total_ingre.replace(/[^0-9]/g, ''), 10),
        total_engreso: parseInt(input.total_engreso.replace(/[^0-9]/g, ''), 10),
        dire_esta_PEPS: input.dire_esta_PEPS || "",
        ciu_esta_PEPS: input.ciu_esta_PEPS || "",
        tel_esta_PEPS: input.tel_esta_PEPS || "",
        fami_PEP: input.fami_PEP || "",
        nomb_PEP: input.nomb_PEP || "",
        impues_sob_vent: input.impues_sob_vent,
        impues_renta: parseInt(input.impues_renta, 10),
        nomb_ref_pers: input.nomb_ref_pers,
        direc_ref_pers: input.direc_ref_pers.trim(),
        tel_ref_pers: input.tel_ref_pers,
        tipo_bien_raices: parseInt(input.tipo_bien_raices, 10),
        direc_bien_raices: input.direc_bien_raices || "",
        ciud_bien_raices: input.ciud_bien_raices || "",
        valor_comer_propi: parseInt(input.valor_comer_propi.replace(/[^0-9]/g, ''), 10),
        marca_vehicu: input.marca_vehicu || "",
        mode_vehicu: input.mode_vehicu || "",
        no_placa: input.no_placa || "",
        Valor_comer_vehicu: parseInt(input.Valor_comer_vehicu.replace(/[^0-9]/g, ''), 10),
        tipo_opera: input.tipo_opera || "",
        num_cta_operint: input.num_cta_operint || "",
        ciud_opera_extr: input.ciud_opera_extr || "",
        pais_opera_extr: input.pais_opera_extr || "",
        moneda: parseInt(input.moneda, 10),
        monto: parseInt(input.monto, 10),
        env_extractos: input.env_extractos,
        env_cert_costos: input.env_cert_costos,
        auta_env_sms: input.auta_env_sms,
        aut_env_email: input.aut_env_email,
        nomb_entidad: input.nomb_entidad || "",
        fec_est_finan: input.mes_info_finan.replaceAll('/', ''),
        des_otros_ingresos: input.des_otros_ingresos,
        ingre_adic: parseInt(input.ingre_adic.replace(/[^0-9]/g, ''), 10),
        total_activo: parseInt(input.total_activo.replace(/[^0-9]/g, ''), 10),
        total_pasivo: parseInt(input.total_pasivo.replace(/[^0-9]/g, ''), 10),
        reseeeuu: input.reseeeuu,
        nacion_americana: input.nacion_americana,
        rel_contractual: input.rel_contractual,
        permFatca: input.permFatca,
        profesion: parseInt(input.profesion, 10),
        id_usuario: input.entidad,
        opera_moneda_extr: input.opera_moneda_extr,
        contrasena: input.pin || "",
        departamento: input.ciud_muni.substring(0, 2)
    };

    return output;
}

export function transformDataJuridica(input) {
    const output = {
        operacion: "C",
        entidad: input.entidad,
        oficina: input.oficina,
        modalidad: input.modalidad || "0",
        tipo_pers: input.tipo_pers,
        fecha_vincul_client: input.fecha_vincul_client,
        nombre_razon_juridico: input.nombre_razon_juridico || "",
        tipo_doc: "N",
        no_docum: input.nit,
        acti_CIIU: input.acti_CIIU || "",
        desc_CIIU: input.desc_CIIU || "",
        dire_empre_neg: input.dire_empre_neg?.trim() || "",
        ciu_empre_neg: input.ciu_empre_neg || "",
        tel_empre_neg: input.tel_empre_neg || "",
        Expu_publi: input.Expu_publi || "N",
        Reco_publi: input.Reco_publi || "N",
        fam_peps_nombres: input.fam_peps_nombres || "",
        fam_peps_paren: input.fam_peps_paren || "",
        mes_info_finan: input.mes_info_finan.replaceAll('/', '') || "",
        declarante: input.declarante || "N",
        ingre_mes: parseInt(input.ingre_mes.replace(/[^0-9]/g, ''), 10) || 0,
        otro_ingre: parseInt(input.otro_ingre.replace(/[^0-9]/g, ''), 10) || 0,
        total_ingre: parseInt(input.total_ingre.replace(/[^0-9]/g, ''), 10) || 0,
        total_engreso: parseInt(input.total_engreso.replace(/[^0-9]/g, ''), 10) || 0,
        dire_esta_PEPS: input.dire_esta_PEPS || "",
        ciu_esta_PEPS: input.ciu_esta_PEPS || "",
        tel_esta_PEPS: input.tel_esta_PEPS || "",
        fami_PEP: input.fami_PEP || "",
        impues_sob_vent: input.impues_sob_vent || "",
        impues_renta: parseInt(input.impues_renta, 10) || 0,
        nomb_ref_pers: input.nomb_ref_pers || "",
        direc_ref_pers: input.direc_ref_pers?.trim() || "",
        tel_ref_pers: input.tel_ref_pers || "",
        tipo_bien_raices: parseInt(input.tipo_bien_raices, 10) || 0,
        direc_bien_raices: input.direc_bien_raices || "",
        ciud_bien_raices: input.ciud_bien_raices || "",
        valor_comer_propi: parseInt(input.valor_comer_propi.replace(/[^0-9]/g, ''), 10) || 0,
        marca_vehicu: input.marca_vehicu || "",
        mode_vehicu: input.mode_vehicu || "",
        no_placa: input.no_placa || "",
        Valor_comer_vehicu: parseInt(input.Valor_comer_vehicu.replace(/[^0-9]/g, ''), 10) || 0,
        tipo_opera: input.tipo_opera || "",
        num_cta_operint: input.num_cta_operint || "",
        ciud_opera_extr: input.ciud_opera_extr || "",
        pais_opera_extr: input.pais_opera_extr || "",
        moneda: parseInt(input.moneda, 10) || 0,
        monto: parseInt(input.monto, 10) || 0,
        env_extractos: input.env_extractos || "",
        env_cert_costos: input.env_cert_costos || "",
        auta_env_sms: input.auta_env_sms || "",
        aut_env_email: input.aut_env_email || "",
        nomb_entidad: input.nomb_entidad || "",
        fec_est_finan: input.mes_info_finan.replaceAll('/', ''),
        des_otros_ingresos: input.des_otros_ingresos || "",
        ingre_adic: parseInt(input.ingre_adic.replace(/[^0-9]/g, ''), 10) || 0,
        total_activo: parseInt(input.total_activo.replace(/[^0-9]/g, ''), 10) || 0,
        total_pasivo: parseInt(input.total_pasivo.replace(/[^0-9]/g, ''), 10) || 0,
        reseeeuu: input.reseeeuu || "",
        nacion_americana: input.nacion_americana || "",
        rel_contractual: input.rel_contractual || "",
        permFatca: input.permFatca || "",
        profesion: parseInt(input.profesion, 10) || 0,
        id_usuario: input.entidad || "",
        opera_moneda_extr: input.opera_moneda_extr || "",
        contrasena: input.pin || "",
        accn2doc_01: input.accn2doc_01 || "",
        accn2doc_02: input.accn2doc_02 || "",
        accn2nom_01: input.accn2nom_01 || "",
        accn2nom_02: input.accn2nom_02 || "",
        accn2par_01: input.accn2par_01 || "",
        accn2par_02: input.accn2par_02 || "",
        aut1: input.aut1 || "S",
        cert: input.cert || "S",
        crs: input.crs || "N",
        dec1: input.dec1 || "S",
        isAuto: input.isAuto || "N",
        marca_laft: input.marca_laft || "4",
        nit: input.nit || "",
        nitCrs: input.nitCrs || "",
        parti_5por_socios: input.parti_5por_socios || "N",
        r_l_ced: input.r_l_ced || "",
        r_l_ciu_nacimiento: input.r_l_ciu_nacimiento || "",
        r_l_email: input.r_l_email || "",
        r_l_expedida: input.r_l_expedida || "",
        r_l_fecha_expdoc: input.r_l_fecha_expdoc || "",
        r_l_fecnacimie: input.r_l_fecnacimie || "",
        r_l_ingresos_mens: parseInt(input.r_l_ingresos_mens.replace(/[^0-9]/g, ''), 10) || 0,
        r_l_nombres: input.r_l_nombres || "",
        r_l_pri_ape: input.r_l_pri_ape || "",
        r_l_seg_ape: input.r_l_seg_ape || "",
        r_l_tel: input.r_l_tel || "",
        r_l_tipo_doc: input.r_l_tipo_doc || "",
        r_l_vr_tot_acti: parseInt(input.r_l_vr_tot_acti.replace(/[^0-9]/g, ''), 10) || 0,
        r_l_vr_tot_pasi: parseInt(input.r_l_vr_tot_pasi.replace(/[^0-9]/g, ''), 10) || 0,
        r_l_vrlr_egresos: parseInt(input.r_l_vrlr_egresos.replace(/[^0-9]/g, ''), 10) || 0,
        r_l_vrlr_otros_in: parseInt(input.r_l_vrlr_otros_in.replace(/[^0-9]/g, ''), 10) || 0,
        sigla: input.sigla || "",
        terms: input.terms || "true",
        tipo_emp_jur: input.tipo_emp_jur || "N",
        tipo_sociedad: input.tipo_sociedad || "9",
        departamento: input.ciu_empre_neg.substring(0, 2)
    };

    return output;
}
