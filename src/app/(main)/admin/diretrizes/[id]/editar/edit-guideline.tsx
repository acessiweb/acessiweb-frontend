"use client";

// import { useEffect, useState } from "react";
// import { ProjectType, useProjects } from "@/context/projects";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import updateProjectSchema from "@/schemas/projects/update-project";
// import { usePush } from "@/context/push";
// import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
// import { captureVoiceAndGetText } from "@/common/utils/voice";
// import { Breadcrumb } from "@/components/breadcrumb";
// import { useScreenType } from "@/hooks/useScreenType";
import { Guideline as GuidelineType } from "@/types/guideline";

export default function EditGuideline({
  guideline,
}: {
  guideline: GuidelineType;
}) {
  return <div></div>;
  // const { projects, updateProject } = useProjects();
  // const { setShowPush, setPushMsg } = usePush();
  // const [project, setProject] = useState({} as ProjectType);
  // const { isTablet } = useScreenType();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm({
  //   resolver: yupResolver(updateProjectSchema),
  // });

  // // useEffect(() => {
  // //   const getParams = async () => {
  // //     const p = await params;

  // //     if (p && p.id) {
  // //       const proj =
  // //         projects.find((proj) => proj.id === p.id) || ({} as ProjectType);

  // //       setProject(proj);

  // //       reset({
  // //         name: proj.name,
  // //         description: proj.description,
  // //         guidelines: proj.guidelines,
  // //         feedback: proj.feedback,
  // //       });
  // //     }
  // //   };

  // //   getParams();
  // // }, []);

  // const onSubmit: SubmitHandler<{
  //   description?: string | undefined;
  //   guidelines?:
  //     | {
  //         name: string;
  //         id: string;
  //       }[]
  //     | undefined;
  //   feedback?: string | undefined;
  //   name: string;
  // }> = (data) => {
  //   const id = updateProject(project.id, {
  //     name: data.name,
  //     description: data.description,
  //     guidelines: data.guidelines || [],
  //     feedback: data.feedback,
  //   });

  //   if (id) {
  //     setShowPush(true);
  //     setPushMsg("Projeto atualizado com sucesso 🥳");
  //   }
  // };

  // // const deleteGuidelineFromProject = (guidelineId: string) => {
  // //   removeGuidelineFromProject(project.id, guidelineId);
  // // };

  // const crumbs = [
  //   {
  //     desc: "PROJETOS",
  //     link: `/projetos`,
  //   },
  //   {
  //     desc: `Editar ${project.name}`,
  //     link: `/projetos/${project.id}/editar`,
  //   },
  // ];

  // return (
  //   <div className="edit-project">
  //     {isTablet && <Breadcrumb crumbs={crumbs} />}
  //     <form className="form" onSubmit={handleSubmit(onSubmit)}>
  //       {/* <div className="input-wrapper">
  //         <div className="input-text-wrapper">
  //           <input
  //             {...register("name")}
  //             type="text"
  //             maxLength={150}
  //             placeholder="Acessibiweb"
  //             id="name"
  //             name="name"
  //           />
  //           <button
  //             className="btn-default"
  //             type="button"
  //             onClick={() => captureVoiceAndGetText("name")}
  //           >
  //             <MicNoneOutlinedIcon />
  //           </button>
  //         </div>
  //         {errors.name && (
  //           <p className="form-error-msg">{errors.name?.message}</p>
  //         )}
  //       </div> */}
  //       <div className="input-wrapper">
  //         <div className="input-text-wrapper">
  //           <textarea
  //             {...register("description")}
  //             placeholder="Descrição do projeto..."
  //             rows={isTablet ? 8 : 4}
  //             id="description"
  //             name="description"
  //           />
  //           <button
  //             className="btn-default"
  //             type="button"
  //             onClick={() => captureVoiceAndGetText("description")}
  //           >
  //             <MicNoneOutlinedIcon />
  //           </button>
  //         </div>
  //       </div>
  //       <div className="edit-project__guidelines">
  //         {/* {getValues()["guidelines"] && getValues()["guidelines"].length > 0 ? (
  //           <div className="grid">
  //             {guidelines.map((guideline, i) => (
  //               <div className="grid__item" key={i}>
  //                 <Card
  //                   mainText={guideline.name}
  //                   registerId={guideline.id}
  //                   onClick={() => {}}
  //                 >
  //                   {isAdmin ? (
  //                     <CardUpdateAndDelete
  //                       registerId={guideline.id}
  //                       registerName={guideline.name}
  //                       onDelete={() => {}}
  //                       onUpdateClick={() => {}}
  //                     />
  //                   ) : (
  //                     <CardAdd
  //                       onAdd={addGuidelinesToCart}
  //                       registerId={guideline.id}
  //                       registerName={guideline.name}
  //                     />
  //                   )}
  //                 </Card>
  //               </div>
  //             ))}
  //           </div>
  //         ) : (
  //           <p>"Você ainda não incluiu diretrizes no seu projeto"</p>
  //         )} */}
  //         {/* <CardList
  //                 data={getValues()["guidelines"] || []}
  //                 hasDelete={true}
  //                 onDelete={deleteGuidelineFromProject}
  //                 errorMsg="Você ainda não incluiu diretrizes no seu projeto"
  //                 showErrorMsgImage={false}
  //               /> */}
  //         {errors.guidelines && (
  //           <p className="form-error-msg">{errors.guidelines?.message}</p>
  //         )}
  //       </div>
  //       <div className="input-wrapper">
  //         <label htmlFor="feedback">Feedback</label>
  //         <div className="input-text-wrapper">
  //           <textarea
  //             {...register("feedback")}
  //             className="textarea"
  //             placeholder="O projeto precisava ser acessível para pessoas com deficiência visual, com as diretrizes selecionadas foi possível implementar acessibilidade para esse grupo..."
  //             rows={11}
  //             id="feedback"
  //             name="feedback"
  //           />
  //           <button
  //             className="btn-default"
  //             type="button"
  //             onClick={() => captureVoiceAndGetText("feedback")}
  //           >
  //             <MicNoneOutlinedIcon />
  //           </button>
  //         </div>
  //       </div>
  //       <div style={{ margin: "30px auto 0" }}>
  //         <button type="submit" className="btn-default">
  //           Atualizar projeto
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
}
