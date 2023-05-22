package tandamzi.pay.payservice.common.response;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tandamzi.pay.payservice.common.result.ListResult;
import tandamzi.pay.payservice.common.result.Result;
import tandamzi.pay.payservice.common.result.SingleResult;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ResponseService {

    private static final String SUCCESS_MESSAGE = "success";

    public Result getDefaultSuccessResult() {
        return getSuccessResult();
    }

    public <T> SingleResult<T> getSingleResult(T data) {
        SingleResult<T> result = new SingleResult<>();
        setSuccessResult(result);
        result.setData(data);

        return result;
    }

    public <T> ListResult<T> getListResult(List<T> data){
        ListResult<T> result = new ListResult<>();
        setSuccessResult(result);
        result.setData(data);

        return result;
    }

    public Result getSuccessResult() {
        Result result = new Result();
        setSuccessResult(result);

        return result;
    }

    public void setSuccessResult(Result result) {
        result.setCode(0);
        result.setMessage(SUCCESS_MESSAGE);
    }

    public Result getFailureResult(int code, String message){
        Result result = new Result();
        result.setCode(code);
        result.setMessage(message);

        return result;
    }
}
