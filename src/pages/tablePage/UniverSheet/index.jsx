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
import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import { UniverUIPlugin } from '@univerjs/ui';
import { FUniver } from "@univerjs/facade";
import locales from './locale'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

// eslint-disable-next-line react/display-name
const UniverSheet = forwardRef(({ data }, ref) => {
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
    univer.registerPlugin(UniverDocsUIPlugin);

    // sheet plugins
    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);

    workbookRef.current = univer.createUniverSheet(data);

    const univerAPI = FUniver.newAPI(univer);

    const activeworkBook = univerAPI.getActiveWorkbook()

    activeworkBook.onSelectionChange(comand => {

      const newinfo = workbookRef.current.save()


    })

    // class AbortCommandError extends Error {
    //   function Object() { [native code] }() {
    //     super('Command blocked from execution');
    //     this.name = 'AbortCommandError';
    //   }
    // }

    // listen to the error event and prevent the default behavior
    const errListener = (e) => {
      const error = e instanceof PromiseRejectionEvent ? e.reason : e.error
      if (error instanceof AbortCommandError) {
        e.preventDefault();
        console.warn(error.message);
      }
    }
    window.addEventListener('error', errListener);
    window.addEventListener('unhandledrejection', errListener);

    // throw the custom error to prevent the command from executing
    univerAPI.onBeforeCommandExecute((command) => {
      // you can also decide whether to block it or not by adding judgment to the situation.
      throw new AbortCommandError();
    })

  }

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

export default UniverSheet;
