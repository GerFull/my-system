import '@univerjs/design/lib/index.css';
import '@univerjs/ui/lib/index.css';
import '@univerjs/sheets-ui/lib/index.css';
import '@univerjs/sheets-formula/lib/index.css';
import './index.css';

import { Univer, LocaleType } from '@univerjs/core';
import { defaultTheme } from '@univerjs/design';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';
import { UniverUIPlugin } from '@univerjs/ui';
import locales from './locale'
import { FUniver } from "@univerjs/facade";

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

// eslint-disable-next-line react/display-name
const UniverDoc = forwardRef(({ data }, ref) => {
  const univerRef = useRef(null);
  const workbookRef = useRef(null);
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData,
  }));

  /**
   * Initialize univer instance and workbook instance
   * @param data {IWorkbookData} document see https://univer.work/api/core/interfaces/IWorkbookData.html
   */
  const init = (data = {}) => {
    if (!containerRef.current) {
      throw Error('container not initialized');
    }
    const univer = new Univer({
      theme: defaultTheme,
      locales,
      locale: LocaleType.EN_US,
    });
    univerRef.current = univer;

    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, {
      container: containerRef.current,
      header: true,
      toolbar: true,
      footer: true,
    });

    // doc plugins
    univer.registerPlugin(UniverDocsPlugin, {
      hasScroll: false,
    });
    univer.registerPlugin(UniverDocsPlugin, {
      standalone: true,
    });

    univer.registerPlugin(UniverDocsUIPlugin, {
      container: containerRef.current,
      layout: {
        docContainerConfig: {
          innerLeft: false,
        },
      },
    });


    const univerAPI = FUniver.newAPI(univer);



    univer.createUniverDoc(data);

    const activeDoc = univerAPI.getActiveDocument()

    console.log('data',data)
    univerAPI.onCommandExecuted

    univerAPI.onCommandExecuted((comand) => {

      console.log(comand.id)
      console.log(activeDoc.getSnapshot())
    })

    // console.log(.getSnapshot())





  };

  /**
   * Destroy univer instance and workbook instance
   */
  const destroyUniver = () => {
    univerRef.current?.dispose();
    univerRef.current = null;
    workbookRef.current = null;
  };

  /**
   * Get workbook data
   */
  const getData = () => {
    if (!workbookRef.current) {
      throw new Error('Workbook is not initialized');
    }
    return workbookRef.current.save();
  };

  useEffect(() => {
    init(data);
    return () => {
      destroyUniver();
    };
  }, [data]);

  return <div ref={containerRef} className="univer-container" />;
});

export default UniverDoc;
